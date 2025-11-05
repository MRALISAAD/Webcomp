import { nanoid } from "nanoid";
import { insertLeadInZoho } from "../utils/zoho.js";
import { logger } from "../utils/logger.js";
import { sendProspectWelcome, sendInternalNewLead } from "../services/mailer.service.js";
import Lead from "../models/Lead.js";
import { env } from "../utils/env.js";
import { resolvePack } from "../utils/packs.js";
import { notifyN8n } from "../utils/n8n.js";
import { withRetry } from "../utils/retry.js";

/**
 * Reçoit un lead depuis le frontend et gère :
 *  - création Zoho CRM
 *  - emails (client + interne)
 */
export async function createLead(req, res, next) {
  const start = Date.now();
  const leadId = nanoid();
  let leadDocument = null;

  try {
    const { body, ip, headers } = req;

    const packInfo = body.packLabel ? { slug: body.pack, label: body.packLabel } : resolvePack(body.pack);
    const computedName = body.fullName || "Client Marhaban";
    const locale = (body.locale || "fr").toLowerCase();
    logger.info(`🎯 Nouveau lead reçu: ${computedName} (${body.email})`);

    const leadPayload = {
      id: leadId,
      fullName: computedName,
      email: body.email,
      phone: body.phone || "",
      pack: packInfo.slug,
      packLabel: packInfo.label,
      message: body.message || "",
      locale,
      source: body.source || "Site Web Marhaban",
      arrivalDate: body.arrivalDate || null,
      airport: body.airport || null,
      city: body.city || null,
      people: body.people ?? null,
      country: body.country || "Canada",
      utm: body.utm || {},
      ip,
      userAgent: headers["user-agent"],
      createdAt: new Date().toISOString(),
    };

    if (env.MONGO_URI) {
      try {
        leadDocument = await Lead.create({
          fullName: leadPayload.fullName,
          email: leadPayload.email,
          phone: leadPayload.phone,
          pack: leadPayload.pack,
          message: leadPayload.message,
          locale: leadPayload.locale,
          source: leadPayload.source,
          status: "pending",
        });
      } catch (mongoError) {
        logger.error(`mongo.insert_failed ${mongoError.message}`);
      }
    }

    const zohoDetails = await withRetry(
      () =>
        insertLeadInZoho({
          fullName: leadPayload.fullName,
          email: leadPayload.email,
          phone: leadPayload.phone,
          pack: leadPayload.pack,
          packLabel: leadPayload.packLabel,
          message: leadPayload.message,
          locale: leadPayload.locale,
          source: leadPayload.source,
          arrivalDate: leadPayload.arrivalDate,
          airport: leadPayload.airport,
          city: leadPayload.city,
          people: leadPayload.people,
          country: leadPayload.country,
          utm: leadPayload.utm,
        }),
      {
        onRetry: (attempt, error) => logger.warn(`zoho.lead_retry attempt=${attempt} error=${error.message}`)
      }
    );

    const zohoId = zohoDetails?.id || null;
    logger.info(`✅ Lead envoyé avec succès à Zoho CRM id=${zohoId || "inconnu"}`);

    if (leadDocument) {
      leadDocument.status = "synced";
      leadDocument.zohoId = zohoId;
      await leadDocument.save();
    }

    await withRetry(() => sendProspectWelcome(leadPayload), {
      onRetry: (attempt, error) => logger.warn(`mailer.prospect_retry attempt=${attempt} error=${error.message}`)
    });
    await withRetry(() => sendInternalNewLead(leadPayload, zohoId), {
      onRetry: (attempt, error) => logger.warn(`mailer.internal_retry attempt=${attempt} error=${error.message}`)
    });
    logger.info("✉️ Mail envoyé avec succès via Zoho Mail");

    await notifyN8n("lead.created", {
      leadId,
      zohoId,
      pack: leadPayload.pack,
      locale,
      email: leadPayload.email,
      submittedAt: leadPayload.createdAt,
    });

    return res.status(201).json({
      success: true,
      leadId,
      zohoId,
      mongoId: leadDocument?._id,
      pack: leadPayload.pack,
      message: "Lead créé et emails envoyés avec succès.",
    });
  } catch (error) {
    logger.error(`❌ Erreur création lead: ${error.message}`);
    if (leadDocument) {
      try {
        leadDocument.status = "error";
        await leadDocument.save();
      } catch (mongoError) {
        logger.error(`mongo.status_update_failed ${mongoError.message}`);
      }
    }
    if (!error.status) {
      error.status = 502;
    }
    error.publicMessage = "Impossible de finaliser votre demande pour le moment. Merci de réessayer sous peu.";
    return next(error);
  }
}

import { logger } from "../utils/logger.js";
import { forwardContactToSupport, sendContactConfirmation } from "./mailer.service.js";
import Contact from "../models/Contact.js";
import { env } from "../utils/env.js";
import { insertLeadInZoho } from "../utils/zoho.js";
import { resolvePack } from "../utils/packs.js";
import { withRetry } from "../utils/retry.js";

export async function handleContactSubmission(contact) {
  const packInfo = contact.pack ? resolvePack(contact.pack) : resolvePack("custom");
  const payload = {
    ...contact,
    fullName: contact.fullName || contact.name,
    preferredLanguage: contact.preferredLanguage || "fr",
    source: contact.source || "web",
    pack: packInfo.slug,
    packLabel: packInfo.label,
  };

  let contactDocument = null;
  if (!payload.fullName) {
    throw new Error("Nom requis");
  }

  if (!payload.email) {
    throw new Error("Email requis");
  }

  if (env.MONGO_URI) {
    try {
      contactDocument = await Contact.create({
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
        preferredLanguage: payload.preferredLanguage,
        source: payload.source,
        status: "pending",
      });
    } catch (error) {
      logger.error(`mongo.contact.insert_failed ${error.message}`);
    }
  }

  await Promise.all([
    withRetry(() => forwardContactToSupport(payload), {
      onRetry: (attempt, error) => logger.warn(`mailer.support_retry attempt=${attempt} error=${error.message}`)
    }),
    withRetry(() => sendContactConfirmation(payload), {
      onRetry: (attempt, error) => logger.warn(`mailer.confirmation_retry attempt=${attempt} error=${error.message}`)
    })
  ]);
  logger.info(`✉️ Mail envoyé avec succès via Zoho Mail pour ${payload.email}`);

  try {
    const zohoDetails = await withRetry(
      () =>
        insertLeadInZoho({
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
          source: payload.source,
          pack: payload.pack,
          packLabel: payload.packLabel,
          locale: payload.preferredLanguage,
        }),
      {
        onRetry: (attempt, error) => logger.warn(`zoho.contact_retry attempt=${attempt} error=${error.message}`)
      }
    );

    logger.info(`✅ Lead secondaire envoyé avec succès à Zoho CRM id=${zohoDetails?.id ?? "inconnu"}`);

    if (contactDocument) {
      contactDocument.status = "synced";
      contactDocument.zohoId = zohoDetails?.id;
      await contactDocument.save();
    }

    return {
      contactId: contactDocument?._id,
      zohoId: zohoDetails?.id,
    };
  } catch (error) {
    logger.warn(`contact.sync_failed ${error.message}`);
    if (contactDocument) {
      contactDocument.status = "error";
      await contactDocument.save();
    }
    return {
      contactId: contactDocument?._id,
      zohoId: null,
    };
  }
}

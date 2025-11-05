import { env } from "../utils/env.js";
import { logger } from "../utils/logger.js";
import { generateInternalEmail } from "./emailTemplates.js";
import {
  sendWelcomeEmail as sendWelcomeEmailRaw,
  sendInternalEmail as sendInternalEmailRaw,
  sendContactConfirmationEmail as sendContactConfirmationEmailRaw,
} from "./mailService.js";

export async function sendWelcomeEmail(lead) {
  const packDisplay = lead.packLabel || lead.pack || "Essentiel";
  const locale = (lead.locale || "fr").toLowerCase();
  const info = await sendWelcomeEmailRaw({
    to: lead.email,
    fullName: lead.fullName || "Client Marhaban",
    pack: packDisplay,
    locale,
  });

  logger.info(`welcome.email.sent to=${lead.email} locale=${locale} messageId=${info.messageId}`);
  return info;
}

export async function sendInternalEmail(data, zohoId) {
  const packDisplay = data.packLabel || data.pack || "Formulaire contact";
  const html = generateInternalEmail({ ...data, packLabel: packDisplay, zohoId });
  const subject =
    packDisplay === "Formulaire contact"
      ? "📨 Nouveau message du site Marhaban Canada"
      : `🆕 Nouveau Lead - ${packDisplay}`;

  const to = env.INTERNAL_NOTIF_EMAIL || "contact@marhabancanada.ca";
  await sendInternalEmailRaw({
    to,
    subject,
    html,
  });
  logger.info(`internal.email.sent lead=${data.fullName || data.name || "N/A"}`);
}

export const sendProspectWelcome = sendWelcomeEmail;
export const sendInternalNewLead = sendInternalEmail;

export async function sendContactConfirmation(contact) {
  await sendContactConfirmationEmailRaw({
    to: contact.email,
    fullName: contact.fullName,
    locale: contact.preferredLanguage || "fr",
  });
  logger.info(`contact.confirmation.sent to=${contact.email}`);
}

export async function forwardContactToSupport(contact) {
  const subject = `Contact — ${contact.subject} (${contact.preferredLanguage?.toUpperCase() || "FR"})`;
  const html = `
    <h3>Nouveau message contact</h3>
    <p><strong>Nom :</strong> ${contact.fullName}</p>
    <p><strong>Email :</strong> ${contact.email}</p>
    ${contact.phone ? `<p><strong>Téléphone :</strong> ${contact.phone}</p>` : ""}
    ${contact.pack ? `<p><strong>Pack :</strong> ${contact.pack}</p>` : ""}
    ${contact.company ? `<p><strong>Entreprise :</strong> ${contact.company}</p>` : ""}
    <p><strong>Langue :</strong> ${contact.preferredLanguage}</p>
    <p><strong>Source :</strong> ${contact.source || "web"}</p>
    <p><strong>Message :</strong></p>
    <p>${contact.message.replace(/\n/g, "<br/>")}</p>
  `;

  await sendInternalEmailRaw({
    to: env.INTERNAL_NOTIF_EMAIL || env.SMTP_USER,
    subject,
    html,
  });
  logger.info(`contact.forwarded subject="${contact.subject}"`);
}

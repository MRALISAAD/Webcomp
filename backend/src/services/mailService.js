import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import { marhabanSignature } from "./marhabanSignature.js";
import { env } from "../utils/env.js";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail({ to, fullName, pack, locale = "fr" }) {
  let subject;
  let html;

  if (locale === "en") {
    subject = `Welcome to Marhaban Canada 🇨🇦 - ${pack} Pack`;
    html = `
      <table width="100%" style="font-family:Poppins,Arial;color:#333;">
        <tr><td align="center">
          <h2 style="color:#e63946;">Welcome ${fullName}!</h2>
          <p>We’ve received your request for the <b>${pack}</b> Pack.<br>
          Our team will contact you soon to assist with your arrival in Canada.</p>
          <p><em>Your arrival in Canada, stress-free.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  } else if (locale === "ar") {
    subject = `مرحبًا بك في مرحبًا كندا 🇨🇦 - باقة ${pack}`;
    html = `
      <table dir="rtl" width="100%" style="font-family:'Cairo',Arial;text-align:right;color:#333;">
        <tr><td align="right">
          <h2 style="color:#e63946;">مرحبًا ${fullName}!</h2>
          <p>لقد استلمنا طلبك بخصوص باقة <b>${pack}</b>.<br>سيتواصل معك فريقنا قريبًا لمساعدتك في الوصول إلى كندا.</p>
          <p><em>وصولك إلى كندا بدون قلق.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  } else {
    subject = `Bienvenue chez Marhaban Canada 🇨🇦 - Pack ${pack}`;
    html = `
      <table width="100%" style="font-family:Poppins,Arial;color:#333;">
        <tr><td align="center">
          <h2 style="color:#e63946;">Bienvenue ${fullName}!</h2>
          <p>Nous avons bien reçu votre demande pour le <b>Pack ${pack}</b>.<br>
          Notre équipe vous contactera bientôt pour planifier votre arrivée.</p>
          <p><em>Votre arrivée au Canada, sans stress.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  }

  const info = await transporter.sendMail({
    from: `"${env.FROM_NAME}" <${env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  logger.info(`✅ Welcome email sent to=${to} (${locale})`);
  return info;
}

export async function sendInternalEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: `"${env.FROM_NAME}" <${env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  logger.info(`📧 Internal email sent to=${to}`);
  return info;
}

export async function sendContactConfirmationEmail({ to, fullName, locale = "fr" }) {
  let subject;
  let html;

  if (locale === "en") {
    subject = "We’ve received your message – Marhaban Canada 🇨🇦";
    html = `
      <table width="100%" style="font-family:Poppins,Arial;color:#333;">
        <tr><td align="center">
          <h2 style="color:#e63946;">Thank you for contacting us!</h2>
          <p>Hello <b>${fullName}</b>, we’ve received your message and will reply soon.</p>
          <p><em>Your arrival in Canada, stress-free.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  } else if (locale === "ar") {
    subject = "📩 تم استلام رسالتك - مرحبًا كندا 🇨🇦";
    html = `
      <table dir="rtl" width="100%" style="font-family:'Cairo',Arial;text-align:right;color:#333;">
        <tr><td align="right">
          <h2 style="color:#e63946;">شكرًا لتواصلك معنا!</h2>
          <p>مرحبًا <b>${fullName}</b>، لقد استلمنا رسالتك وسنرد عليك قريبًا.</p>
          <p><em>وصولك إلى كندا بدون قلق.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  } else {
    subject = "Nous avons bien reçu votre message – Marhaban Canada 🇨🇦";
    html = `
      <table width="100%" style="font-family:Poppins,Arial;color:#333;">
        <tr><td align="center">
          <h2 style="color:#e63946;">Merci de nous avoir contactés !</h2>
          <p>Bonjour <b>${fullName}</b>, nous avons bien reçu votre message. Nous vous répondrons bientôt.</p>
          <p><em>Votre arrivée au Canada, sans stress.</em></p>
          ${marhabanSignature}
        </td></tr>
      </table>`;
  }

  const info = await transporter.sendMail({
    from: `"${env.FROM_NAME}" <${env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  logger.info(`✅ Contact confirmation sent to=${to}`);
  return info;
}

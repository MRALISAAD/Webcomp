const nodemailer = require("nodemailer");

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️  SMTP non configuré : aucune réponse automatique ne sera envoyée.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const transporter = createTransporter();

function plainReply(name) {
  return `Bonjour ${name},

Merci d’avoir contacté Marhaba Canada ! Ton message a bien été reçu.
Un membre de notre équipe te contactera rapidement pour t’aider à préparer ton arrivée.

🇲🇦🤝🇨🇦 Ici, t’es pas seul.
— L’équipe Marhaba Canada
`;
}

function htmlReply(name) {
  const safeName = escapeHtml(name);
  return `
  <div style="font-family:system-ui,Arial,Helvetica,sans-serif;line-height:1.5">
    <p>Bonjour <strong>${safeName}</strong>,</p>
    <p>Merci d’avoir contacté <strong>Marhaba Canada</strong> ! Ton message a bien été reçu.<br/>
    Un membre de notre équipe te contactera rapidement pour t’aider à préparer ton arrivée.</p>
    <p>🇲🇦🤝🇨🇦 <em>Ici, t’es pas seul.</em></p>
    <p>— L’équipe Marhaba Canada</p>
  </div>`;
}

function escapeHtml(value = "") {
  return value.replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[match]));
}

async function sendAutoReply({ fullName, email }) {
  if (!transporter) return;

  const from = process.env.REPLY_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: email,
    subject: "On a bien reçu ta demande — Marhaba Canada",
    text: plainReply(fullName),
    html: htmlReply(fullName),
  });
  console.log("📧 Email envoyé à", email);
}

async function sendAdminNotification(data) {
  if (!transporter) return;

  const to = process.env.MAIL_ADMIN || process.env.SMTP_USER;
  const description = [
    `Nom : ${data.fullName}`,
    `Email : ${data.email}`,
    data.whatsapp ? `WhatsApp : ${data.whatsapp}` : null,
    data.city ? `Ville actuelle : ${data.city}` : null,
    `Projet : ${data.project}`,
    data.arrivalDate ? `Arrivée prévue : ${data.arrivalDate}` : null,
    data.needs?.length ? `Besoins : ${data.needs.join(", ")}` : null,
    data.message ? `Message : ${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: process.env.REPLY_FROM || process.env.SMTP_USER,
    to,
    subject: `📩 Nouvelle demande : ${data.fullName}`,
    text: description,
    html: description.replace(/\n/g, "<br>"),
  });
  console.log("📧 Notification envoyée à l’équipe :", to);
}

module.exports = {
  sendAutoReply,
  sendAdminNotification,
};

import { marhabanSignature } from "./marhabanSignature.js";

export const generateWelcomeEmail = (fullName, pack, locale = "fr") => {
  const styles = `
    <style>
      @media (prefers-color-scheme: dark) {
        body, table { background-color: #1e1e1e !important; color: #f1f1f1 !important; }
        .btn { background-color: #ef4444 !important; color: #fff !important; }
        .container { background-color: #2a2a2a !important; border-color: #444 !important; }
      }
    </style>
  `;

  if (locale === "en") {
    return `
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8f9fb;font-family:Poppins,Arial,sans-serif;color:#333;">
      ${styles}
      <tr><td align="center">
        <table class="container" width="600" cellpadding="20" cellspacing="0" style="background-color:#fff;border-radius:12px;margin-top:20px;box-shadow:0 3px 8px rgba(0,0,0,0.1);border:1px solid #eee;">
          <tr><td align="center" style="padding:30px 20px;">
            <img src="https://marhabancanada.ca/images/logo.png" width="90" alt="Marhaban Canada" style="margin-bottom:15px;">
            <h2 style="color:#e63946;margin-bottom:10px;">Welcome to Marhaban Canada 🇨🇦</h2>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p style="font-size:16px;line-height:1.6;margin-top:10px;">
              We’ve received your request for the <strong>${pack} Pack</strong>.<br>
              Our team will contact you shortly to assist you with your arrival process.
            </p>
            <div style="margin-top:25px;">
              <a href="https://marhabancanada.ca/en" class="btn" style="background-color:#e63946;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Visit our website</a>
            </div>
            <p style="font-size:14px;color:#666;margin-top:30px;">
              Thank you for trusting us.<br>
              <em>Your arrival in Canada, stress-free.</em>
            </p>
            ${marhabanSignature}
          </td></tr>
        </table>
      </td></tr>
    </table>`;
  }

  if (locale === "ar") {
    return `
    <table dir="rtl" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8f9fb;font-family:'Cairo',Arial,sans-serif;color:#333;text-align:right;">
      ${styles}
      <tr><td align="center">
        <table class="container" width="600" cellpadding="20" cellspacing="0" style="background-color:#fff;border-radius:12px;margin-top:20px;box-shadow:0 3px 8px rgba(0,0,0,0.1);border:1px solid #eee;">
          <tr><td align="right" style="padding:30px 20px;">
            <img src="https://marhabancanada.ca/images/logo.png" width="90" alt="Marhaban Canada" style="margin-bottom:15px;">
            <h2 style="color:#e63946;margin-bottom:10px;">مرحبًا بكم في مرحبًا كندا 🇨🇦</h2>
            <p>مرحبًا <strong>${fullName}</strong>،</p>
            <p style="font-size:16px;line-height:1.8;margin-top:10px;">
              لقد استلمنا طلبك بخصوص <strong>الباقة ${pack}</strong>.<br>
              سيتواصل معك فريقنا قريبًا لمساعدتك في خطوات الوصول إلى كندا.
            </p>
            <div style="margin-top:25px;">
              <a href="https://marhabancanada.ca/ar" class="btn" style="background-color:#e63946;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">زيارة موقعنا</a>
            </div>
            <p style="font-size:14px;color:#666;margin-top:30px;">
              شكرًا على ثقتك بنا.<br>
              <em>وصولك إلى كندا بدون قلق.</em>
            </p>
            ${marhabanSignature}
          </td></tr>
        </table>
      </td></tr>
    </table>`;
  }

  return `
  <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8f9fb;font-family:Poppins,Arial,sans-serif;color:#333;">
    ${styles}
    <tr><td align="center">
      <table class="container" width="600" cellpadding="20" cellspacing="0" style="background-color:#fff;border-radius:12px;margin-top:20px;box-shadow:0 3px 8px rgba(0,0,0,0.1);border:1px solid #eee;">
        <tr><td align="center" style="padding:30px 20px;">
          <img src="https://marhabancanada.ca/images/logo.png" width="90" alt="Marhaban Canada" style="margin-bottom:15px;">
          <h2 style="color:#e63946;margin-bottom:10px;">Bienvenue chez Marhaban Canada 🇨🇦</h2>
          <p>Bonjour <strong>${fullName}</strong>,</p>
          <p style="font-size:16px;line-height:1.6;margin-top:10px;">
            Nous avons bien reçu votre demande pour le <strong>Pack ${pack}</strong>.<br>
            Notre équipe vous contactera bientôt pour planifier votre arrivée au Canada.
          </p>
          <div style="margin-top:25px;">
            <a href="https://marhabancanada.ca" class="btn" style="background-color:#e63946;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Visiter notre site</a>
          </div>
          <p style="font-size:14px;color:#666;margin-top:30px;">
            Merci pour votre confiance.<br>
            <em>Votre arrivée au Canada, sans stress.</em>
          </p>
          ${marhabanSignature}
        </td></tr>
      </table>
    </td></tr>
  </table>`;
};

export const generateInternalEmail = (data) => {
  const internalStyles = `
    <style>
      @media (prefers-color-scheme: dark) {
        body, table { background-color: #1e1e1e !important; color: #f1f1f1 !important; }
        .card { background-color: #2a2a2a !important; border-color: #444 !important; }
        .codebox { background-color: #333 !important; color: #f1f1f1 !important; }
      }
    </style>
  `;

  const packDisplay = data.packLabel || data.pack || "Formulaire contact";
  const zohoLine = data.zohoId ? `<p><strong>Zoho ID :</strong> ${data.zohoId}</p>` : "";

  return `
  <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;font-family:Inter,Arial,sans-serif;color:#333;">
    ${internalStyles}
    <tr><td align="center">
      <table class="card" width="600" cellpadding="20" cellspacing="0" style="background-color:#fff;border-radius:10px;margin-top:20px;border:1px solid #eee;">
        <tr><td>
          <h2 style="color:#e63946;">📩 Nouveau message reçu</h2>
          <p><strong>Nom :</strong> ${data.name || data.fullName || "Non précisé"}</p>
          <p><strong>Email :</strong> ${data.email || "Non précisé"}</p>
          <p><strong>Téléphone :</strong> ${data.phone || "Non précisé"}</p>
          <p><strong>Pack :</strong> ${packDisplay}</p>
          ${zohoLine}
          <p><strong>Message :</strong></p>
          <div class="codebox" style="background-color:#f9f9f9;padding:12px;border-radius:6px;font-size:15px;white-space:pre-line;">
            ${data.message || "(aucun message)"}
          </div>
          <p style="font-size:14px;color:#777;margin-top:25px;">
            Langue : ${data.locale || "fr"}<br>
            Reçu le : ${new Date().toLocaleString("fr-CA")}
          </p>
          ${marhabanSignature}
        </td></tr>
      </table>
      <p style="font-size:12px;color:#999;margin-top:10px;">
        Notification automatique – Marhaban Canada CRM
      </p>
    </td></tr>
  </table>`;
};

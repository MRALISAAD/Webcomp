require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE) === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: process.env.REPLY_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_ADMIN || process.env.SMTP_USER,
      subject: 'Test SMTP - Marhaba Canada',
      text: 'Ceci est un test SMTP — ignorez ce message.'
    });

    console.log('✅ Mail envoyé :', info.messageId || info);
  } catch (e) {
    console.error('❌ Erreur SMTP :', e.response?.data || e.response || e.message || e);
  }
})();

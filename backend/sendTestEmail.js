// Usage: node sendTestEmail.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const sgMail = require('@sendgrid/mail');

const { MAIL_USER, SENDGRID_API_KEY } = process.env;

if (!MAIL_USER) {
  console.error('❌ MAIL_USER is missing from .env (expected sender/recipient address).');
  process.exit(1);
}

if (!SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY is missing from .env.');
  process.exit(1);
}

if (!SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ SENDGRID_API_KEY must start with "SG." – check your SendGrid dashboard.');
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

async function run() {
  try {
    await sgMail.send({
      to: MAIL_USER,
      from: MAIL_USER,
      subject: 'Test SendGrid OK',
      html: '<p>Test SendGrid depuis script ✅</p>',
    });
    console.log('Email sent ✅');
  } catch (error) {
    console.error('❌ SendGrid error:', {
      statusCode: error?.response?.statusCode,
      message: error?.message,
      body: error?.response?.body,
    });
    process.exit(1);
  }
}

run();

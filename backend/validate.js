const REQUIRED_ENV = ['MAIL_USER', 'SENDGRID_API_KEY'];

const ensureEnv = () => {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Configuration manquante: ${missing.join(', ')}`);
  }

  if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    throw new Error('SENDGRID_API_KEY doit commencer par "SG."');
  }

  return {
    mailUser: process.env.MAIL_USER,
    sendgridApiKey: process.env.SENDGRID_API_KEY,
  };
};

module.exports = { ensureEnv };

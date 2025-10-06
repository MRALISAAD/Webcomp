// backend/server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const app = express();

/* ---------- Config ---------- */
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URLS = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const MAIL_USER = process.env.MAIL_USER || '';
const SG_KEY = process.env.SENDGRID_API_KEY || '';

if (SG_KEY) sgMail.setApiKey(SG_KEY);

/* ---------- Middleware ---------- */
app.set('trust proxy', 1);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl / same-origin
      return FRONTEND_URLS.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS: ' + origin));
    },
    credentials: true,
  })
);

/* ---------- Mongo ---------- */
const DemandeSchema = new mongoose.Schema(
  {
    nom: String,
    email: String,
    telephone: String,
    dateArrivee: String,
    heureArrivee: String,
    service: String,
    personnes: String,
    adresse: String,
    message: String,
    etreRappelle: Boolean,
    contactWhatsApp: Boolean,
  },
  { timestamps: true, versionKey: false }
);
const Demande = mongoose.model('Demande', DemandeSchema);

(async () => {
  try {
    if (!MONGODB_URI) {
      console.error('❌ Configuration manquante: MONGODB_URI');
      process.exit(1);
    }
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connexion MongoDB OK');
  } catch (err) {
    console.error('❌ Erreur MongoDB:', err);
    process.exit(1);
  }
})();

/* ---------- Routes ---------- */
app.get('/', (_req, res) => res.send('API Marhaba Canada 🚀'));
app.get('/healthz', (_req, res) =>
  res.json({ ok: true, mongo: mongoose.connection.readyState === 1 ? 'up' : 'down' })
);

app.post('/api/contact', async (req, res) => {
  const {
    nom,
    email,
    telephone = '',
    dateArrivee,
    heureArrivee = '',
    service = '',
    personnes = '',
    adresse = '',
    message = '',
    etreRappelle = false,
    contactWhatsApp = false,
  } = req.body || {};

  if (!nom || !email || !dateArrivee) {
    return res.status(400).json({
      success: false,
      error: "Merci de renseigner nom, email et date d'arrivée.",
    });
  }

  try {
    // 1) Save to DB
    const doc = await Demande.create({
      nom,
      email,
      telephone,
      dateArrivee,
      heureArrivee,
      service,
      personnes,
      adresse,
      message,
      etreRappelle,
      contactWhatsApp,
    });

    // 2) Fire-and-forget emails (never block the response)
    (async () => {
      if (!SG_KEY || !MAIL_USER) return;
      const adminHtml = `
        <h1>Nouvelle demande</h1>
        <ul>
          <li><b>Nom:</b> ${nom}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Téléphone:</b> ${telephone}</li>
          <li><b>Date/heure d'arrivée:</b> ${dateArrivee} ${heureArrivee || ''}</li>
          <li><b>Service:</b> ${service}</li>
          <li><b>Personnes:</b> ${personnes}</li>
          <li><b>Adresse:</b> ${adresse}</li>
          <li><b>WhatsApp:</b> ${contactWhatsApp ? 'Oui' : 'Non'} — <b>Rappel:</b> ${etreRappelle ? 'Oui' : 'Non'}</li>
          <li><b>Message:</b> ${message || '—'}</li>
        </ul>
      `;
      const clientHtml = `
        <p>Bonjour ${nom},</p>
        <p>Merci pour votre demande. Un membre de l'équipe Marhaba Canada vous contactera sous 24h.</p>
        <p>— Marhaba Canada</p>
      `;
      try {
        await sgMail.send({ to: MAIL_USER, from: MAIL_USER, subject: `Nouvelle demande – ${nom}`, html: adminHtml });
        await sgMail.send({ to: email, from: MAIL_USER, subject: 'Merci pour votre demande', html: clientHtml });
      } catch (e) {
        console.error('[sendgrid:error]', {
          statusCode: e?.response?.statusCode,
          message: e?.message,
          body: e?.response?.body,
        });
      }
    })();

    // 3) Reply to the browser immediately
    res.json({ success: true, confirmation: 'Demande envoyée avec succès ✅', data: doc });
  } catch (err) {
    console.error('❌ /api/contact:', err);
    res.status(500).json({ success: false, error: "Impossible d'enregistrer la demande." });
  }
});

app.get('/api/demandes', async (_req, res) => {
  try {
    const rows = await Demande.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, rows });
  } catch (err) {
    console.error('❌ /api/demandes:', err);
    res.status(500).json({ success: false, error: 'Impossible de récupérer les demandes.' });
  }
});

/* ---------- Start ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

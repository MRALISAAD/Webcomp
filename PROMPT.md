# 🧠 GPT Codex Prompt — Marhaban Canada (Full Stack)

## 🎯 Objectif
Construire une plateforme complète (frontend + backend) pour Marhaban Canada afin de capturer des leads, déclencher Zoho CRM/Mail, et orchestrer des automatisations n8n, avec une expérience utilisateur premium.

## 🏗️ Architecture à respecter
- **Frontend** : React + Vite + TailwindCSS + framer-motion + i18n (FR/EN/AR) + Dark/Light mode.
- **Backend** : Node.js + Express + Helmet + CORS + Compression + RateLimit + Winston.
- **Emails** : Nodemailer via Zoho Mail (SMTP TLS 465) + templates HTML.
- **CRM** : API Zoho CRM (`/crm/v2/Leads`) via OAuth2 `refresh_token`.
- **Automations** : Webhook n8n (log + Slack + Airtable/Sheets + rappel 24h).
- **SEO** : Helmet, meta dynamiques, sitemap, robots, Schema.org, OG/Twitter cards.

## ✅ To-do Prioritaire
1. **Backend**
   - Route `POST /api/leads` avec validation Zod, rate limit, sanitisation.
   - Création lead Zoho (refresh token → access token, POST `/Leads`).
   - Emails : interne (ops@marhabancanada.ca) + confirmation client (Zoho Mail SMTP).
   - Notification `env.N8N_WEBHOOK_URL` (POST) en mode fire-and-forget.
   - Healthcheck `GET /api/status` (+ requestCounter + redaction logs).

2. **Frontend**
   - Formulaire `LeadForm` responsive (FR/EN/AR) sur `/packs` et `/contact`.
   - Hero + sections Packs/Processus/FAQ/Blog/About/Dashboard redesign (palette : #FAF5EF, #0A2239, #D4AF37, #F5F5F5).
   - Dark/Light mode, animations hover/fade, icônes Lucide.
   - UX : CTA clair, confirmation post-soumission, honeypot + support reCAPTCHA v3.

3. **Emails**
   - Templates HTML (client + interne) cohérents avec charte.
   - Signature Marhaban, liens utiles, fallback texte.

4. **Automations & Monitoring**
   - Webhook n8n prêt à recevoir payload (leadId, zohoId, pack, locale, email).
   - Logs Winston (mask email/téléphone si log centralisé), Sentry optionnel.
   - `/status` retourne uptime + services (Zoho, SMTP, Mongo, request count).

5. **SEO & Perf**
   - Meta dynamiques par page, `buildMeta()` helper.
   - `robots.txt`, `sitemap.xml`, lazy-loading images, bundle analyzer, gzip on server.

## 🔐 Variables d’environnement (.env)
```env
# Zoho CRM
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_ACCOUNTS_URL=https://accounts.zohocloud.ca
ZOHO_API_URL=https://www.zohoapis.ca/crm/v2
ZOHO_MODULE=LeadsWeb

# Emails
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=contact@marhabancanada.ca
SMTP_PASS=
FROM_NAME="Marhaban Canada"
INTERNAL_NOTIF_EMAIL=ops@marhabancanada.ca

# App
PORT=8080
NODE_ENV=production
CORS_ORIGIN=https://marhabancanada.ca,https://www.marhabancanada.ca
LOG_LEVEL=info

# Automations
N8N_WEBHOOK_URL=
SENTRY_DSN=
MONGO_URI=
MONGO_DB=marhaban
```

## 📧 Emails (résumé)
- **Client** : « Merci — Nous avons bien reçu votre demande » (HTML + texte).
- **Interne** : « Nouveau lead : [Nom] — [Pack] » avec payload JSON.

## 🧪 Tests & QA
- Unit tests `/api/leads` (Zoho + Nodemailer mock).
- Test intégration formulaire → API → Zoho → mail → n8n.
- UX mobile, accessibilité (axe-core), anti-spam (honeypot / reCAPTCHA).

## 📈 Monitoring
- Winston + rotation logs, Sentry (optionnel).
- Request counter exposé via header + `/status`.
- Slack/Email alert si webhook n8n en échec.

## 🔚 Livrables
- Code frontend + backend production-ready.
- Formulaire multilingue moderne.
- Intégrations Zoho (CRM + Mail) testées.
- Templates mails HTML.
- Workflow n8n documenté.
- README technique + `.env.example`.
- SEO (meta, OG, sitemap, robots).

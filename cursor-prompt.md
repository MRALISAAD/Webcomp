#agent: coder
#task:
Tu travailles sur le repo Marhaban Canada. Implémente une refonte full-stack en respectant absolument la charte (#FAF5EF / #0A2239 / #D4AF37 / #F5F5F5), l’i18n FR/EN/AR et l’intégration Zoho.

- Backend (Node/Express)
  - Route `POST /api/leads` → Zod validation, honeypot, rate limit 30 req/min, creation Zoho CRM (refresh token flow), emails internes + client via Nodemailer (Zoho SMTP), notification `process.env.N8N_WEBHOOK_URL`.
  - Route `GET /status` → uptime, env, request counter, statut Zoho/SMTP.
  - Middlewares : helmet, cors (whitelist `.env`), compression, Winston logger, requestCounter.

- Frontend (React/Vite/Tailwind)
  - Palette Marhaban, composants responsive, animations douces.
  - Formulaire `LeadForm` (FR/EN/AR, dark/light, validation UX) présent sur `/packs` & `/contact`.
  - Pages : Home, Packs, About, Processus, Contact, Blog, FAQ, Dashboard. SEO via helper meta + Helmet.

- Emails HTML : `emails/client-confirmation.html`, `emails/internal-alert.html`.
- Automations : webhook n8n (log + Slack + Airtable + rappel 24h).
- Tests : jest + supertest pour `/api/leads` (Zoho, Nodemailer mocks).
- Docs : README + `.env.example` à jour (Zoho, SMTP, N8N, Sentry).

Livrables = code propre, responsive, SEO-ready, intégrations Zoho/n8n opérationnelles.

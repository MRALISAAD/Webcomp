# Marhaban Canada — Backend API

## Installation

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoints principaux

- `GET /api/status` — health check
- `GET /api/faq` — FAQ locale + fallback Zoho CRM
- `POST /api/leads` — création lead (Zoho CRM + emailing)
- `POST /api/contact` — formulaire de contact (Zoho CRM + emailing)
- `POST /api/n8n` — webhook d’orchestration (accusé de réception)
- `POST /api/dashboard/code` — envoi code d'accès par email
- `POST /api/dashboard/session` — validation code + création session
- `GET /api/dashboard` — données espace client (header `Authorization: Bearer <token>`)
- `POST /api/uploads/link` — génération lien de dépôt (stub sprint 2)
- `GET /api/admin/metrics` — métriques admin (Basic Auth requis)

## Scripts utilitaires

- `npm run test:smtp` — validation SMTP Zoho Mail
- `npm run test:zoho` — validation intégration Zoho CRM
- `npm run refresh:zoho` — régénération du token d'accès Zoho
- `npm run sitemap` — génération de `frontend/public/sitemap.xml`

## Variables d'environnement clés

Toutes les variables attendues sont documentées dans `.env.example`. À minima :

- `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`
- `ZOHO_ACCOUNTS_URL` (par défaut `https://accounts.zohocloud.ca`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FROM_NAME`
- `INTERNAL_NOTIF_EMAIL` pour recevoir les alertes internes
- `N8N_WEBHOOK_URL` *(optionnel)* pour notifier votre workflow n8n après chaque lead
- `SENTRY_DSN` *(optionnel)* pour les erreurs runtime

## Notes

- Le backend fonctionne sur Node.js 20 et expose l'API sur le port `8080`.
- Les identifiants `ADMIN_USER` / `ADMIN_PASS` sont obligatoires (Basic Auth sur `/api/admin/metrics`).
- Les codes dashboard expirent après 10 minutes, les sessions après 12h (mémoire).
- Chaque réponse expose l'en-tête `X-Request-Count` (compteur in-memory) utile pour le monitoring.
- Activez `N8N_WEBHOOK_URL` pour relayer les leads vers n8n sans bloquer la réponse API.

# Marhaban Canada v1.0

Site vitrine multilingue (FR/EN/AR) connecté à un backend Express pour créer des leads Zoho CRM et envoyer un accusé de réception via Zoho Mail.

## Installation
```
cd backend
cp .env.example .env
npm install

cd ../frontend
npm install
```

## Démarrage local
- Terminal A → `cd backend && npm run dev`
- Terminal B → `cd frontend && npm run dev`

## Build production
```
cd frontend
npm run build
```
Les fichiers `robots.txt` et `sitemap.xml` sont copiés automatiquement dans `dist/` après le build.

## Notes Zoho
- Créer les champs personnalisés `Custom_Pack__c` et `Arrival_Date__c` dans le module Leads.
- Le token d’accès repose sur `ZOHO_REFRESH_TOKEN`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_ACCOUNTS_URL` et `ZOHO_BASE_URL` (voir `.env.example`).
- Recommandé : workflow Zoho "On Create Lead" pour automatiser les notifications internes.

## QA
✅ `/contact` → Lead créé dans Zoho + email d’accusé réception reçu
✅ Formulaire responsive, validation FR/EN/AR, mode sombre/clair, tracking UTM
✅ Lighthouse ≥ 85 (Performance & Accessibilité)
✅ Sitemap & robots prêts pour déploiement marhabancanada.ca / api.marhabancanada.ca

## Déploiement
- Backend : toute plateforme Node.js (Render, Railway, Hostinger). Exposer `PORT` et variables Zoho.
- Frontend : Vite static build (Netlify, Vercel, Cloudflare Pages). Configurer le proxy `/api` si nécessaire.
- Mettre à jour le `VITE_API_BASE_URL` pour pointer vers `https://api.marhabancanada.ca` lors du build de production.

# webcomp

## Installation rapide

1. Copier `.env.example` vers `backend/.env` et remplir les vraies valeurs (MongoDB, JWT, Zoho OAuth, SMTP Zoho). Ne validez jamais ce fichier.
2. Installer les dépendances dans chaque dossier (`backend`, `frontend`, `admin`).
3. Lancer les services :
   ```sh
   # Backend
   cd backend && npm run dev

   # Frontend public
   cd frontend && npm run dev

   # Dashboard admin
   cd admin && npm run dev
   ```

Le backend expose un serveur Express protégé par `helmet`, un rate limit et une journalisation Pino. Les routes admin nécessitent un JWT signé avec `JWT_SECRET` (durée configurable via `ADMIN_JWT_TTL`). Pour créer un compte admin hors production, activez temporairement `ENABLE_ADMIN_REGISTER=true` dans `backend/.env` ou utilisez le script `backend/scripts/createAdmin.js`.

### Intégrations externes

- **Zoho CRM** : renseigner `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET` et `ZOHO_REFRESH_TOKEN` pour créer automatiquement un lead à chaque soumission de formulaire.
- **Emails** : fournir `MAIL_USER`/`MAIL_PASS` (mot de passe d’application Zoho) ainsi que `MAIL_HOST` et `MAIL_PORT` pour envoyer l’accusé de réception et la notification interne.

## Tester l'API (exemples Fetch)

```js
// Ajouter une demande (publique)
await fetch(`${process.env.API_BASE_URL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nom: 'Ali Saad',
    email: 'ali@example.com',
    service: 'Transport VIP',
    message: "Merci pour l'accompagnement",
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);

// Authentifier un admin et récupérer les demandes
const loginResponse = await fetch(`${process.env.API_BASE_URL}/api/admin/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'motDePasse+++' }),
});
const { token } = await loginResponse.json();

await fetch(`${process.env.API_BASE_URL}/api/admin/demandes`, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
```

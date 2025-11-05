# 🚀 Guide de Lancement - Marhaban Canada

## 📋 Méthode 1 : Développement Local (Recommandé)

### Prérequis
- Node.js 20+ installé
- npm ou yarn

### 1️⃣ Backend

```bash
# Se déplacer dans le dossier backend
cd backend

# Installer les dépendances (si pas déjà fait)
npm install

# Créer le fichier .env si nécessaire
cp .env.example .env
# Puis éditer .env avec vos credentials Zoho

# Lancer le backend en mode développement
npm run dev
```

Le backend sera accessible sur : **http://localhost:8080**

**Vérifier que le backend fonctionne :**
```bash
curl http://localhost:8080/api/status
```

### 2️⃣ Frontend

Dans un **nouveau terminal** :

```bash
# Se déplacer dans le dossier frontend
cd frontend

# Installer les dépendances (si pas déjà fait)
npm install

# Créer le fichier .env si nécessaire
# Voir frontend/.env.example pour les variables

# Lancer le frontend en mode développement
npm run dev
```

Le frontend sera accessible sur : **http://localhost:5173**

---

## 🐳 Méthode 2 : Docker (Production)

### Lancer tout le projet avec Docker Compose

```bash
# Depuis la racine du projet
docker-compose up -d --build
```

**Services disponibles :**
- Frontend : http://localhost:5173
- Backend API : http://localhost:8080
- Caddy Proxy : http://localhost:80, https://localhost:443

**Vérifier les logs :**
```bash
docker-compose logs -f
```

**Arrêter les services :**
```bash
docker-compose down
```

---

## 🔧 Scripts Disponibles

### Backend
- `npm run dev` : Mode développement avec auto-reload
- `npm start` : Mode production

### Frontend
- `npm run dev` : Serveur de développement Vite
- `npm run build` : Build de production
- `npm run preview` : Prévisualiser le build
- `npm run lint` : Vérifier le code
- `npm run typecheck` : Vérifier TypeScript

---

## ⚙️ Configuration Environnement

### Backend (.env)
```env
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,https://marhabancanada.ca
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
ZOHO_ACCOUNTS_URL=https://accounts.zohocloud.ca
ZOHO_API_URL=https://www.zohoapis.ca/crm/v2
ZOHO_MODULE=LeadsWeb
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=contact@marhabancanada.ca
SMTP_PASS=your_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WHATSAPP_NUMBER=15146910262
VITE_SITE_URL=https://marhabancanada.ca
VITE_SITE_NAME=Marhaban Canada
VITE_DEFAULT_LOCALE=fr
```

---

## ✅ Vérifications

### Backend fonctionnel
```bash
curl http://localhost:8080/api/status
# Devrait retourner : {"status":"online",...}
```

### Frontend fonctionnel
Ouvrir http://localhost:5173 dans le navigateur

### Tests Zoho
```bash
cd backend
node scripts/testZoho.js
```

---

## 🐛 Dépannage

### Port déjà utilisé
- Backend (8080) : Changer `PORT` dans `backend/.env`
- Frontend (5173) : Vite le changera automatiquement si occupé

### Erreurs de dépendances
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreurs Zoho
- Vérifier les credentials dans `backend/.env`
- Tester avec `node scripts/testZoho.js`

---

## 📝 Notes

- Le frontend pointe vers `http://localhost:8080/api` par défaut
- Le dark mode est géré automatiquement via localStorage
- Les traductions FR/EN/AR sont activées via i18next


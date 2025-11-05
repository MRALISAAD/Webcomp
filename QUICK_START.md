# 🚀 Démarrage Rapide - Marhaban Canada

> Guide ultra-rapide pour lancer le projet en 3 commandes

---

## ⚡ Installation en 3 Étapes

### 1️⃣ Vérifier l'environnement
```bash
./check.sh
```

### 2️⃣ Installer les dépendances
```bash
./setup.sh
```

### 3️⃣ Lancer le projet
```bash
./dev.sh
```

**C'est tout!** 🎉

---

## 📍 Accès au Projet

Une fois lancé:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

---

## 🛑 Arrêter les Serveurs

Appuyez sur **Ctrl+C** dans le terminal où `dev.sh` est lancé.

---

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `./check.sh` | Vérifie que votre environnement est prêt |
| `./setup.sh` | Installe toutes les dépendances |
| `./dev.sh` | Lance backend + frontend en développement |

---

## ⚙️ Configuration Avancée

### Configurer Zoho CRM (Optionnel)

Éditer `backend/.env` et remplir:
```bash
ZOHO_CLIENT_ID=votre_client_id
ZOHO_CLIENT_SECRET=votre_secret
ZOHO_REFRESH_TOKEN=votre_refresh_token
SMTP_PASS=votre_mot_de_passe_zoho_mail
```

Pour obtenir le refresh token:
```bash
cd backend
node getZohoToken.mjs
```

---

## 📚 Documentation Complète

- **Guide de développement frontend**: `frontend/DEVELOPMENT_GUIDE.md`
- **Configuration complète**: `FRONTEND_SETUP_COMPLETE.md`
- **Documentation générale**: `README.md`
- **Guide de lancement détaillé**: `RUN.md`

---

## 🐛 Problèmes Courants

### Erreur: "node: command not found"
```bash
# Installer Node.js 20+
# https://nodejs.org/
```

### Erreur: "Permission denied"
```bash
# Rendre les scripts exécutables
chmod +x check.sh setup.sh dev.sh
```

### Port déjà utilisé
```bash
# Trouver et tuer le processus sur le port 8080
lsof -ti:8080 | xargs kill -9

# Ou sur le port 5173
lsof -ti:5173 | xargs kill -9
```

### Dépendances corrompues
```bash
# Nettoyer et réinstaller
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
./setup.sh
```

---

## 💡 Workflows

### Développement Quotidien
```bash
# Lancer le projet
./dev.sh

# Travailler sur votre code...
# Les changements se rechargent automatiquement (Hot Reload)

# Arrêter: Ctrl+C
```

### Vérifier Avant de Commit
```bash
# Frontend
cd frontend
npm run typecheck  # Vérifier les types
npm run lint       # Vérifier le code
npm run build      # Vérifier que le build passe

# Backend
cd backend
npm start          # Vérifier que le backend démarre
```

### Build de Production
```bash
# Frontend
cd frontend
npm run build
# Résultat dans: frontend/dist/

# Backend
cd backend
npm start
```

---

## 🐳 Alternative: Docker

Si vous préférez Docker:
```bash
docker-compose up -d --build
```

Accès identique:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

Arrêter:
```bash
docker-compose down
```

---

## 📊 Structure du Projet

```
webcomp/
├── check.sh              # ✅ Vérification environnement
├── setup.sh              # 📦 Installation
├── dev.sh                # 🚀 Démarrage
├── frontend/             # React + TypeScript
│   ├── .env             # Variables d'environnement
│   └── DEVELOPMENT_GUIDE.md  # Guide complet
├── backend/              # Node.js + Express
│   └── .env             # Variables d'environnement
└── docker-compose.yml    # Configuration Docker
```

---

## 🎯 Prochaines Étapes

1. ✅ Lancer le projet avec `./dev.sh`
2. 📖 Lire `frontend/DEVELOPMENT_GUIDE.md`
3. 🎨 Explorer le Design System Marhaban
4. 🌍 Tester le support multilingue (FR/EN/AR)
5. 🔧 Créer votre première feature

---

**Bon développement! 🚀**

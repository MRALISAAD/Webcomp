# 📋 Commandes à Exécuter dans Votre Terminal

> **Copier-coller ces commandes dans votre terminal Linux/WSL**

---

## 🎯 ÉTAPE 1: Récupérer les Dernières Modifications

```bash
cd ~/projects/dev/webcomp
git pull origin claude/verify-project-011CUpM4U1VznZmcpsiyJLsG
```

---

## 🎯 ÉTAPE 2: Vérifier l'Environnement

```bash
./check.sh
```

**Cette commande vérifie:**
- ✅ Node.js installé (version >= 20)
- ✅ npm installé
- ✅ Fichiers .env présents
- ✅ Ports disponibles (8080, 5173)

---

## 🎯 ÉTAPE 3: Installer les Dépendances

```bash
./setup.sh
```

**Cette commande:**
- 📦 Installe les dépendances backend (147 packages)
- 📦 Installe les dépendances frontend (559 packages)
- 📝 Crée les fichiers .env s'ils n'existent pas

⏱️ **Temps estimé:** 2-3 minutes

---

## 🎯 ÉTAPE 4: Lancer le Projet

```bash
./dev.sh
```

**Cette commande démarre:**
- 🔙 Backend sur http://localhost:8080
- 🎨 Frontend sur http://localhost:5173

✅ **Les deux serveurs tournent en même temps!**

---

## 🛑 Pour Arrêter les Serveurs

Dans le terminal où `./dev.sh` est lancé, appuyez sur:

```
Ctrl + C
```

---

## 📝 Commandes Complètes en Une Seule Fois

Si vous voulez tout faire d'un coup:

```bash
cd ~/projects/dev/webcomp && \
git pull origin claude/verify-project-011CUpM4U1VznZmcpsiyJLsG && \
./check.sh && \
./setup.sh && \
./dev.sh
```

---

## 🔧 Commandes Alternatives

### Si les scripts ne sont pas exécutables:

```bash
chmod +x check.sh setup.sh dev.sh
```

### Lancer Backend et Frontend Séparément:

**Terminal 1 - Backend:**
```bash
cd ~/projects/dev/webcomp/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ~/projects/dev/webcomp/frontend
npm run dev
```

### Vérifier que les serveurs tournent:

```bash
# Backend
curl http://localhost:8080/api/status

# Frontend (ouvrir dans le navigateur)
# http://localhost:5173
```

---

## 🐛 En Cas de Problème

### Erreur: "Node.js n'est pas installé"

```bash
# Installer Node.js 20+
# Suivre: https://nodejs.org/
```

### Erreur: "Port déjà utilisé"

```bash
# Tuer le processus sur le port 8080
lsof -ti:8080 | xargs kill -9

# Tuer le processus sur le port 5173
lsof -ti:5173 | xargs kill -9
```

### Erreur: "npm install failed"

```bash
# Nettoyer et réinstaller
cd ~/projects/dev/webcomp
rm -rf frontend/node_modules backend/node_modules
rm -rf frontend/package-lock.json backend/package-lock.json
./setup.sh
```

### Erreur: "Permission denied"

```bash
chmod +x check.sh setup.sh dev.sh
```

---

## ✅ Vérification de Succès

Une fois `./dev.sh` lancé, vous devriez voir:

```
================================================
✓ Serveurs démarrés!
================================================

Frontend: http://localhost:5173
Backend:  http://localhost:8080

Appuyez sur Ctrl+C pour arrêter
```

Ouvrez votre navigateur sur **http://localhost:5173** pour voir le site!

---

## 📚 Documentation Complémentaire

- **Guide rapide:** `QUICK_START.md`
- **Guide développement frontend:** `frontend/DEVELOPMENT_GUIDE.md`
- **Configuration complète:** `FRONTEND_SETUP_COMPLETE.md`
- **README principal:** `README.md`

---

## 🎉 C'est Prêt!

Vous pouvez maintenant développer sur le projet Marhaban Canada!

**Bon développement! 🚀**

# 🔧 Fix: Scripts Non Exécutables

> Guide de dépannage si vous avez l'erreur: "cannot execute: required file not found"

---

## 🐛 Le Problème

Cette erreur arrive quand les scripts ont des **line endings Windows (CRLF)** au lieu de **Unix (LF)**.

---

## ✅ Solution Rapide (1 commande)

Copiez-collez dans votre terminal:

```bash
cd ~/projects/dev/webcomp && sed -i 's/\r$//' check.sh setup.sh dev.sh && chmod +x check.sh setup.sh dev.sh
```

---

## ✅ Solution Détaillée

### Méthode 1: Avec `sed`

```bash
# Convertir les line endings
sed -i 's/\r$//' check.sh
sed -i 's/\r$//' setup.sh
sed -i 's/\r$//' dev.sh

# Rendre exécutables
chmod +x check.sh setup.sh dev.sh
```

### Méthode 2: Avec `dos2unix` (si installé)

```bash
# Installer dos2unix (si nécessaire)
sudo apt-get install dos2unix

# Convertir les fichiers
dos2unix check.sh setup.sh dev.sh

# Rendre exécutables
chmod +x check.sh setup.sh dev.sh
```

---

## ✅ Vérifier que C'est Corrigé

```bash
# Vérifier le format des fichiers
file check.sh

# Devrait afficher: "Bourne-Again shell script, UTF-8 text executable"
# Sans "CRLF line terminators"
```

---

## 🔄 Re-tester

Après la correction, réessayez:

```bash
./check.sh
```

Si ça fonctionne, vous verrez l'affichage coloré de vérification.

---

## 🛡️ Prévention Future

Le fichier `.gitattributes` a été créé pour éviter ce problème à l'avenir.

---

## 💡 Autres Erreurs Possibles

### "command not found: ./check.sh"

```bash
# Vous n'êtes pas dans le bon dossier
cd ~/projects/dev/webcomp
```

### "Permission denied"

```bash
# Rendre exécutable
chmod +x check.sh setup.sh dev.sh
```

---

## 🎯 Commandes Complètes

Une fois corrigé, lancez:

```bash
./check.sh    # Vérifier l'environnement
./setup.sh    # Installer les dépendances (si besoin)
./dev.sh      # Lancer le projet
```

---

**Note:** Ce problème est maintenant corrigé automatiquement avec `.gitattributes`

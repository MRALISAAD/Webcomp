# 💻 Ouvrir le Projet dans VS Code

> Guide simple pour synchroniser et ouvrir le projet dans Visual Studio Code

---

## 🚀 Méthode 1: Depuis le Terminal (Recommandée)

### Étape 1: Aller dans le projet

```bash
cd ~/projects/dev/webcomp
```

### Étape 2: Récupérer les dernières modifications

```bash
git pull origin claude/verify-project-011CUpM4U1VznZmcpsiyJLsG
```

### Étape 3: Ouvrir VS Code

```bash
code .
```

**C'est tout!** VS Code s'ouvre avec le projet.

---

## 🔄 Méthode 2: Depuis VS Code

### Option A: Ouvrir un Dossier

1. Ouvrir VS Code
2. **Fichier** > **Ouvrir le dossier...**
3. Naviguer vers: `~/projects/dev/webcomp`
4. Cliquer **Sélectionner le dossier**

### Option B: Depuis la Palette de Commandes

1. Ouvrir VS Code
2. `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
3. Taper: `Git: Clone`
4. Coller l'URL: `https://github.com/MRALISAAD/Webcomp`
5. Choisir le dossier de destination
6. Ouvrir le projet cloné

---

## 📥 Synchroniser avec Git dans VS Code

### Récupérer les Dernières Modifications

**Méthode 1 - Interface Graphique:**
1. Cliquer sur l'icône **Source Control** (barre latérale gauche)
2. Cliquer sur les **3 points** (...)
3. **Pull** > Sélectionner la branche `claude/verify-project-011CUpM4U1VznZmcpsiyJLsG`

**Méthode 2 - Terminal Intégré:**
1. `` Ctrl+` `` pour ouvrir le terminal intégré
2. Taper:
```bash
git pull origin claude/verify-project-011CUpM4U1VznZmcpsiyJLsG
```

---

## ⚙️ Configuration VS Code Recommandée

### Extensions Essentielles

Installez ces extensions pour une meilleure expérience:

```bash
# Ouvrir la palette d'extensions
Ctrl+Shift+X
```

**Extensions recommandées:**

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linting JavaScript/TypeScript

2. **Prettier** (`esbenp.prettier-vscode`)
   - Formatage automatique du code

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplétion TailwindCSS

4. **TypeScript Vue Plugin (Volar)** (`Vue.volar`)
   - Support TypeScript amélioré

5. **GitLens** (`eamodio.gitlens`)
   - Git enrichi

6. **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
   - Snippets React

7. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Renommage automatique de tags

8. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - Autocomplétion des chemins

**Installation rapide (copier-coller dans le terminal):**

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

---

## 🔧 Paramètres VS Code Recommandés

### Créer `.vscode/settings.json`

Le fichier existe peut-être déjà. Sinon, créez-le:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 🚀 Lancer le Projet depuis VS Code

### Méthode 1: Terminal Intégré

1. Ouvrir le terminal: `` Ctrl+` ``
2. Lancer:
```bash
./dev.sh
```

### Méthode 2: Tasks VS Code

Créer `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Démarrer Backend",
      "type": "shell",
      "command": "cd backend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Démarrer Frontend",
      "type": "shell",
      "command": "cd frontend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Démarrer Tout",
      "type": "shell",
      "command": "./dev.sh",
      "problemMatcher": []
    }
  ]
}
```

Ensuite: `Ctrl+Shift+P` > **Tasks: Run Task** > **Démarrer Tout**

---

## 📂 Structure du Projet dans VS Code

Après ouverture, vous verrez:

```
webcomp/
├── 📁 backend/           # API Node.js
├── 📁 frontend/          # React TypeScript
├── 📄 check.sh          # Vérifier environnement
├── 📄 setup.sh          # Installer dépendances
├── 📄 dev.sh            # Lancer le projet
├── 📄 README.md         # Documentation principale
└── 📄 AMELIORATIONS.md  # Dernières améliorations
```

---

## 🔍 Fonctionnalités VS Code Utiles

### 1. Recherche Globale

```
Ctrl+Shift+F
```

Chercher dans tous les fichiers du projet.

### 2. Aller à un Fichier

```
Ctrl+P
```

Taper le nom du fichier pour l'ouvrir rapidement.

### 3. Palette de Commandes

```
Ctrl+Shift+P
```

Accès à toutes les commandes VS Code.

### 4. Terminal Intégré

```
Ctrl+`
```

Ouvrir/fermer le terminal.

### 5. Explorateur de Fichiers

```
Ctrl+Shift+E
```

Naviguer dans les fichiers.

### 6. Contrôle de Source (Git)

```
Ctrl+Shift+G
```

Voir les changements Git.

---

## 🐛 Dépannage

### Problème: "code: command not found"

**Solution:**

1. Ouvrir VS Code
2. `Ctrl+Shift+P`
3. Taper: **Shell Command: Install 'code' command in PATH**
4. Redémarrer le terminal

### Problème: Extensions ne fonctionnent pas

**Solution:**

```bash
# Redémarrer VS Code
Ctrl+Shift+P > Developer: Reload Window
```

### Problème: TypeScript ne détecte pas les types

**Solution:**

1. Ouvrir un fichier `.tsx`
2. `Ctrl+Shift+P`
3. **TypeScript: Select TypeScript Version**
4. Choisir **Use Workspace Version**

---

## 📚 Raccourcis Clavier Essentiels

| Raccourci | Action |
|-----------|--------|
| `Ctrl+P` | Ouvrir un fichier rapidement |
| `Ctrl+Shift+P` | Palette de commandes |
| `` Ctrl+` `` | Terminal intégré |
| `Ctrl+B` | Basculer la barre latérale |
| `Ctrl+Shift+E` | Explorateur de fichiers |
| `Ctrl+Shift+F` | Recherche globale |
| `Ctrl+Shift+G` | Git / Source Control |
| `Ctrl+/` | Commenter/Décommenter |
| `Alt+↑/↓` | Déplacer une ligne |
| `Shift+Alt+↑/↓` | Dupliquer une ligne |
| `Ctrl+D` | Sélection multiple |
| `F2` | Renommer symbole |

---

## 🎯 Workflow Recommandé

### 1. Matin (Début de travail)

```bash
# Terminal intégré (Ctrl+`)
cd ~/projects/dev/webcomp
git pull origin claude/verify-project-011CUpM4U1VznZmcpsiyJLsG
./dev.sh
```

### 2. Développement

- Modifier le code dans VS Code
- Hot Reload automatique (pas besoin de redémarrer)
- Vérifier les erreurs ESLint/TypeScript
- Formatter avec Prettier (Ctrl+Shift+I)

### 3. Fin de travail (Commit)

**Dans VS Code:**

1. `Ctrl+Shift+G` (Source Control)
2. Voir les changements
3. Stage les fichiers (cliquer sur +)
4. Écrire un message de commit
5. Cliquer sur ✓ (Commit)
6. Cliquer sur ... > Push

**Ou en ligne de commande:**

```bash
git add .
git commit -m "Description des changements"
git push
```

---

## 🎨 Personnalisation

### Thème Recommandé

**Dark:**
- One Dark Pro
- Dracula Official
- Night Owl

**Light:**
- GitHub Light Default
- Solarized Light

**Installation:**
`Ctrl+Shift+P` > **Preferences: Color Theme**

### Police Recommandée

- **Fira Code** (avec ligatures)
- **JetBrains Mono**
- **Cascadia Code**

---

## ✅ Checklist de Démarrage

- [ ] VS Code installé
- [ ] Projet ouvert: `code ~/projects/dev/webcomp`
- [ ] Extensions installées (ESLint, Prettier, Tailwind)
- [ ] Terminal intégré ouvert (`` Ctrl+` ``)
- [ ] Dernières modifications récupérées (`git pull`)
- [ ] Projet lancé (`./dev.sh`)
- [ ] Frontend ouvert: http://localhost:5173
- [ ] Backend accessible: http://localhost:8080

---

## 🎉 Vous Êtes Prêt!

Votre environnement VS Code est maintenant configuré pour **Marhaban Canada**!

**Commandes essentielles:**

```bash
# Ouvrir le projet
cd ~/projects/dev/webcomp
code .

# Lancer le projet (dans VS Code terminal)
./dev.sh

# Accéder au site
# http://localhost:5173
```

**Bon développement! 🚀**

# 🎨 Guide de Développement Frontend - Marhaban Canada

> Guide complet et respectueux pour développer sur le frontend React/TypeScript

---

## 📋 Table des Matières

1. [🚀 Démarrage Rapide](#-démarrage-rapide)
2. [🏗️ Architecture](#-architecture)
3. [🎨 Design System](#-design-system)
4. [🌍 Internationalisation](#-internationalisation)
5. [📦 Composants](#-composants)
6. [🔧 Développement](#-développement)
7. [✅ Bonnes Pratiques](#-bonnes-pratiques)
8. [🐛 Debugging](#-debugging)

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js**: 20+
- **npm**: 10+
- **Backend**: Doit tourner sur `http://localhost:8080`

### Installation

```bash
# 1. Se placer dans le dossier frontend
cd frontend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env (déjà fait si vous suivez ce guide)
# Le fichier .env doit contenir:
# VITE_API_BASE_URL=http://localhost:8080/api
# VITE_WHATSAPP_NUMBER=15146910262
# VITE_SITE_URL=https://marhabancanada.ca
# VITE_DEFAULT_LOCALE=fr

# 4. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:5173**

---

## 🏗️ Architecture

### Structure du Projet

```
frontend/
├── public/                 # Fichiers statiques
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── src/
│   ├── assets/            # Images, icônes, médias
│   ├── components/        # Composants réutilisables
│   │   ├── ui/           # Composants UI de base (shadcn/ui)
│   │   ├── home/         # Composants spécifiques à la page d'accueil
│   │   ├── homeV2/       # Nouvelle version de la page d'accueil
│   │   ├── packs/        # Composants liés aux packs de services
│   │   ├── Form/         # Formulaires
│   │   └── layout/       # Composants de mise en page
│   ├── pages/             # Pages de l'application
│   ├── lib/               # Bibliothèques et utilitaires
│   │   ├── i18n.ts       # Configuration i18next
│   │   ├── axios.ts      # Instance axios configurée
│   │   ├── seo.ts        # Helpers SEO
│   │   └── utils.ts      # Utilitaires divers
│   ├── i18n/              # Fichiers de traduction
│   │   └── locales/
│   │       ├── fr/       # Traductions françaises
│   │       ├── en/       # Traductions anglaises
│   │       └── ar/       # Traductions arabes
│   ├── utils/             # Utilitaires (certains en JS legacy)
│   ├── styles/            # Styles globaux
│   │   └── index.css     # TailwindCSS + styles personnalisés
│   ├── App.tsx            # Composant racine avec routing
│   └── main.tsx           # Point d'entrée de l'application
├── .env                   # Variables d'environnement (local)
├── .env.example           # Template des variables d'environnement
├── vite.config.ts         # Configuration Vite
├── tailwind.config.js     # Configuration TailwindCSS
└── tsconfig.json          # Configuration TypeScript
```

### Stack Technique

| Technologie | Version | Usage |
|------------|---------|-------|
| **React** | 18.3+ | Framework UI |
| **TypeScript** | 5.6+ | Typage statique |
| **Vite** | 5.4+ | Build tool & dev server |
| **TailwindCSS** | 3.4+ | Styling |
| **React Router** | 6.30+ | Routing |
| **i18next** | 23.16+ | Internationalisation (FR/EN/AR) |
| **Framer Motion** | 11.18+ | Animations |
| **React Hook Form** | 7.53+ | Gestion de formulaires |
| **Zod** | 4.1+ | Validation de schémas |
| **Axios** | 1.7+ | Requêtes HTTP |

---

## 🎨 Design System

### Palette de Couleurs

Le projet utilise la palette **Marhaban** définie dans `tailwind.config.js`:

#### Couleurs Principales

```css
/* Bleu (Primary) */
--marhaban-blue: #1F3A5F;
--marhaban-charcoal: #0B2239;
--marhaban-night: #081628;

/* Or/Gold (Secondary) */
--marhaban-gold: #BFA45B;
--marhaban-gold-hover: #A68D44;

/* Beige/Crème (Background) */
--marhaban-beige: #FDF8F3;
--marhaban-white: #FFFFFF;

/* Accent */
--marhaban-red: #B2452F;
```

#### Utilisation dans le Code

```tsx
// TailwindCSS
<div className="bg-marhaban-beige text-marhaban-blue">
  <button className="bg-marhaban-gold hover:bg-marhaban-gold-hover">
    Réserver
  </button>
</div>

// Ou via les alias
<div className="bg-cream text-primary">
  <button className="bg-gold hover:bg-goldHover">
    Réserver
  </button>
</div>
```

### Typographie

```css
/* Titres */
font-family: 'Poppins', sans-serif;

/* Corps de texte */
font-family: 'Inter', system-ui, sans-serif;

/* Citations */
font-family: 'Playfair Display', serif;
```

#### Utilisation

```tsx
<h1 className="font-poppins text-4xl font-bold text-primary">
  Titre Principal
</h1>

<p className="font-inter text-base text-grayText">
  Texte de paragraphe
</p>

<blockquote className="font-quote italic">
  Citation élégante
</blockquote>
```

### Dark Mode

Le projet supporte le dark mode via TailwindCSS:

```tsx
// Dans vos composants
<div className="bg-white dark:bg-navy text-primary dark:text-cream">
  Contenu qui s'adapte au thème
</div>
```

---

## 🌍 Internationalisation

Le projet supporte **3 langues**: Français (FR), Anglais (EN), et Arabe (AR) avec support RTL.

### Utilisation de i18next

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### Changer de Langue

```tsx
import { changeAppLanguage } from '@/lib/i18n';

// Dans un composant
<button onClick={() => changeAppLanguage('fr')}>Français</button>
<button onClick={() => changeAppLanguage('en')}>English</button>
<button onClick={() => changeAppLanguage('ar')}>العربية</button>
```

### Ajouter une Traduction

1. Ouvrir `src/i18n/locales/{langue}/common.json`
2. Ajouter la clé de traduction:

```json
{
  "mySection": {
    "title": "Mon Titre",
    "description": "Ma Description"
  }
}
```

3. Utiliser dans le code:

```tsx
{t('mySection.title')}
```

### Support RTL (Arabe)

Le changement de langue vers l'arabe applique automatiquement:
- Direction RTL sur `<html dir="rtl">`
- Layout inversé via TailwindCSS

---

## 📦 Composants

### Composants UI (shadcn/ui)

Le projet utilise **shadcn/ui** pour les composants de base:

```
src/components/ui/
├── button.tsx        # Boutons
├── input.tsx         # Champs de saisie
├── card.tsx          # Cartes
├── accordion.tsx     # Accordéons
├── toast.tsx         # Notifications
├── select.tsx        # Sélecteurs
└── ...
```

#### Exemple: Utiliser un Bouton

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Réserver Maintenant
</Button>

// Variantes disponibles:
// - default, destructive, outline, secondary, ghost, link
// Tailles:
// - sm, default, lg, icon
```

### Composants de Formulaire

```tsx
import { ContactForm } from '@/components/Form/ContactForm';
import { QuickLeadForm } from '@/components/packs/QuickLeadForm';

// Formulaire de contact
<ContactForm />

// Formulaire rapide de lead
<QuickLeadForm pack="Premium" />
```

### Composants de Layout

```tsx
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

<Section className="py-16 bg-marhaban-beige">
  <Container>
    <h2>Votre Contenu</h2>
  </Container>
</Section>
```

---

## 🔧 Développement

### Scripts Disponibles

```bash
# Développement
npm run dev              # Lance le serveur de dev sur :5173

# Build
npm run build            # Build de production dans dist/

# Preview
npm run preview          # Prévisualise le build de production

# Qualité du Code
npm run lint             # Vérifie le code avec ESLint
npm run typecheck        # Vérifie les types TypeScript

# Tests
npm test                 # Lance les tests avec Vitest
```

### Variables d'Environnement

Toutes les variables d'environnement doivent être préfixées par `VITE_`:

```bash
# ✅ Correct
VITE_API_BASE_URL=http://localhost:8080/api

# ❌ Incorrect (ne sera pas accessible)
API_BASE_URL=http://localhost:8080/api
```

Accès dans le code:

```tsx
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Créer une Nouvelle Page

1. **Créer le fichier de page:**

```tsx
// src/pages/MaNouvellePage.tsx
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/Container';
import { SEO } from '@/lib/seo';

export default function MaNouvellePage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title="Ma Nouvelle Page | Marhaban Canada"
        description="Description de ma nouvelle page"
      />

      <Container className="py-16">
        <h1 className="text-4xl font-bold text-primary">
          {t('maPage.title')}
        </h1>
      </Container>
    </>
  );
}
```

2. **Ajouter la route dans `App.tsx`:**

```tsx
import MaNouvellePage from './pages/MaNouvellePage';

// Dans <Routes>
<Route path="/ma-nouvelle-page" element={<MaNouvellePage />} />
```

3. **Ajouter les traductions:**

```json
// src/i18n/locales/fr/common.json
{
  "maPage": {
    "title": "Ma Nouvelle Page"
  }
}
```

### Créer un Nouveau Composant

```tsx
// src/components/MonComposant.tsx
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface MonComposantProps {
  title: string;
  description?: string;
  className?: string;
}

export const MonComposant: FC<MonComposantProps> = ({
  title,
  description,
  className
}) => {
  return (
    <div className={cn("p-4 bg-white rounded-lg", className)}>
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
    </div>
  );
};
```

### Faire une Requête API

```tsx
import { api } from '@/lib/axios';
import { useState } from 'react';

function MonComposant() {
  const [loading, setLoading] = useState(false);

  const submitLead = async (data: LeadData) => {
    setLoading(true);
    try {
      const response = await api.post('/leads', data);
      console.log('Lead créé:', response.data);
      // Succès
    } catch (error) {
      console.error('Erreur:', error);
      // Gestion d'erreur
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={submitLead} disabled={loading}>
      {loading ? 'Envoi...' : 'Envoyer'}
    </button>
  );
}
```

---

## ✅ Bonnes Pratiques

### 1. **Respecter l'Architecture Existante**

- ✅ Utiliser les composants UI existants avant d'en créer de nouveaux
- ✅ Respecter la structure des dossiers
- ✅ Suivre les conventions de nommage

### 2. **TypeScript**

```tsx
// ✅ Bon: Typage explicite des props
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// ❌ Mauvais: any
function Button(props: any) { }
```

### 3. **TailwindCSS**

```tsx
// ✅ Bon: Utiliser les classes utilitaires
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">

// ❌ Mauvais: CSS inline
<div style={{ display: 'flex', padding: '24px' }}>
```

### 4. **Composants Réutilisables**

```tsx
// ✅ Bon: Composant flexible avec className
export const Card = ({ className, children }) => (
  <div className={cn("p-6 bg-white rounded-lg", className)}>
    {children}
  </div>
);

// ❌ Mauvais: Styles en dur
export const Card = ({ children }) => (
  <div className="p-6 bg-white rounded-lg">
    {children}
  </div>
);
```

### 5. **Performance**

```tsx
// ✅ Bon: Lazy loading des pages
const Blog = lazy(() => import('./pages/Blog'));

// ✅ Bon: Mémorisation des callbacks
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

### 6. **SEO**

```tsx
// ✅ Bon: Utiliser le composant SEO
import { SEO } from '@/lib/seo';

<SEO
  title="Pack Premium | Marhaban Canada"
  description="Découvrez notre pack premium"
  keywords="immigration, canada, montreal"
/>
```

### 7. **Internationalisation**

```tsx
// ✅ Bon: Tout texte doit être traduit
{t('packs.premium.title')}

// ❌ Mauvais: Texte en dur
"Pack Premium"
```

---

## 🐛 Debugging

### Problèmes Courants

#### 1. **Le backend n'est pas accessible**

```bash
# Vérifier que le backend tourne
curl http://localhost:8080/api/status

# Si non, lancer le backend
cd backend && npm run dev
```

#### 2. **Erreurs TypeScript**

Certains fichiers sont en JavaScript legacy. Pour éviter les erreurs:

```tsx
// @ts-ignore
import { MonModule } from './legacy-file.js';
```

#### 3. **Traductions manquantes**

Si une clé de traduction n'existe pas:

```json
// Ajouter dans tous les fichiers de langue
{
  "nouvelleSection": {
    "title": "Nouveau Titre"
  }
}
```

#### 4. **Dark Mode ne fonctionne pas**

Vérifier que la classe `dark` est présente sur `<html>`:

```tsx
// ThemeToggle devrait ajouter/retirer la classe
document.documentElement.classList.toggle('dark');
```

---

## 📚 Ressources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev
- **TailwindCSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **i18next**: https://www.i18next.com
- **React Hook Form**: https://react-hook-form.com

---

## 🎯 Prochaines Étapes

1. ✅ Environnement de développement configuré
2. ✅ Dépendances installées
3. ✅ Fichiers .env créés
4. 🔄 Lancer le serveur de développement
5. 🔄 Créer votre première feature

---

## 💡 Conseils de Développement

### Workflow Recommandé

1. **Créer une branche de feature:**
   ```bash
   git checkout -b feature/ma-nouvelle-feature
   ```

2. **Développer en mode watch:**
   ```bash
   npm run dev  # Auto-reload activé
   ```

3. **Tester régulièrement:**
   ```bash
   npm run typecheck  # Vérifier les types
   npm run lint       # Vérifier le code
   ```

4. **Build avant de commit:**
   ```bash
   npm run build  # S'assurer que le build passe
   ```

### Hot Module Replacement (HMR)

Vite offre un HMR ultra-rapide:
- Les changements CSS sont appliqués instantanément
- Les composants React se rechargent sans perdre l'état
- Les erreurs s'affichent en overlay dans le navigateur

---

**Développé avec ❤️ pour Marhaban Canada**

*Guide mis à jour le: 2025-11-05*

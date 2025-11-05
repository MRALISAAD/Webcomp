# 🎯 Prompt de Développement - Marhaban Canada

> Prompt complet pour développeurs et IA pour continuer le développement du projet

---

## 📋 CONTEXTE DU PROJET

**Nom:** Marhaban Canada
**Type:** Plateforme web full-stack d'accompagnement pour nouveaux arrivants au Canada
**Tech Stack:** React 18 + TypeScript + Vite / Node.js + Express

**Objectif:**
Fournir des services d'accompagnement complets (aéroport, logement, démarches administratives, intégration) pour les nouveaux arrivants au Canada via des packs de services (Essentiel, Confort, Premium).

**Langues:** Français (FR), Anglais (EN), Arabe (AR) avec support RTL

---

## 🏗️ ARCHITECTURE

### Frontend
- **Framework:** React 18.3+ avec TypeScript 5.6+
- **Build:** Vite 5.4+
- **Styling:** TailwindCSS 3.4+ avec palette Marhaban
- **Routing:** React Router 6.30+
- **Forms:** React Hook Form + Zod
- **i18n:** i18next (FR/EN/AR avec RTL)
- **Animations:** Framer Motion
- **UI:** shadcn/ui (Radix UI)

### Backend
- **Framework:** Express.js 4.19+
- **Validation:** Zod 3.23+
- **CRM:** Zoho CRM API
- **Email:** Zoho Mail (SMTP)
- **Sécurité:** Helmet, CORS, Rate Limiting
- **Logs:** Winston

### Base de Données
- **Optionnel:** MongoDB (Mongoose)
- **Stockage principal:** Zoho CRM

---

## 🎨 DESIGN SYSTEM

### Palette de Couleurs Marhaban

```css
/* Couleurs Principales */
--marhaban-blue: #1F3A5F;       /* Primary */
--marhaban-charcoal: #0B2239;   /* Primary Dark */
--marhaban-gold: #BFA45B;       /* Secondary */
--marhaban-beige: #FDF8F3;      /* Background */
--marhaban-white: #FFFFFF;      /* White */
--marhaban-red: #B2452F;        /* Accent */
```

### Typographie

- **Titres:** Poppins (font-poppins)
- **Corps:** Inter (font-inter)
- **Citations:** Playfair Display (font-quote)

### Composants

Utiliser **shadcn/ui** pour tous les composants UI de base:
- Button, Input, Textarea, Select, Checkbox
- Alert, Card, Dialog, Toast
- Accordion, Table, Badge

---

## 📁 STRUCTURE DU PROJET

```
webcomp/
├── frontend/
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── home/         # Composants page d'accueil
│   │   │   ├── homeV2/       # Nouvelle version page d'accueil
│   │   │   ├── packs/        # Composants packs
│   │   │   ├── Form/         # Formulaires
│   │   │   ├── OptimizedImage.tsx   # Image optimisée
│   │   │   └── LazyImage.tsx        # Image lazy load
│   │   ├── hooks/            # Hooks personnalisés
│   │   │   ├── useDebounce.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── useMediaQuery.ts
│   │   ├── pages/            # Pages
│   │   ├── lib/              # Utilitaires
│   │   │   ├── i18n.ts       # Configuration i18next
│   │   │   ├── axios.ts      # Instance axios
│   │   │   ├── seo.ts        # Helpers SEO
│   │   │   └── utils.ts      # cn() + utilitaires
│   │   └── i18n/locales/     # Traductions FR/EN/AR
│   ├── public/
│   │   ├── manifest.json     # PWA manifest
│   │   ├── sw.js            # Service Worker
│   │   └── images/          # Images statiques
│   ├── .vscode/             # Configuration VS Code
│   │   ├── settings.json
│   │   ├── extensions.json
│   │   └── tasks.json
│   └── DEVELOPMENT_GUIDE.md
│
├── backend/
│   ├── src/
│   │   ├── routes/          # Routes API
│   │   ├── controllers/     # Contrôleurs
│   │   ├── services/        # Services (Zoho, Mail)
│   │   ├── middleware/      # Middlewares
│   │   ├── models/          # Modèles MongoDB (optionnel)
│   │   ├── schemas/         # Schémas Zod
│   │   └── utils/           # Utilitaires
│   └── .env                 # Variables d'environnement
│
├── .vscode/                 # Config VS Code workspace
├── check.sh                 # Vérifier environnement
├── setup.sh                 # Installer dépendances
├── dev.sh                   # Lancer le projet
├── README.md
├── AMELIORATIONS.md
├── AMELIORATIONS_CODE_FRONTEND.md
└── OUVRIR_VSCODE.md
```

---

## 🔧 CONVENTIONS DE CODE

### TypeScript

```tsx
// ✅ BON: Typage explicite des props
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "outline";
}

// ✅ BON: Utiliser type pour les unions
type PackType = "Essentiel" | "Confort" | "Premium";

// ❌ MAUVAIS: any
function handleClick(data: any) { }
```

### Composants React

```tsx
// ✅ BON: Function component avec TypeScript
interface MyComponentProps {
  title: string;
  description?: string;
}

const MyComponent: FC<MyComponentProps> = ({ title, description }) => {
  return <div>{title}</div>;
};

export default MyComponent;
```

### Hooks Personnalisés

```tsx
// ✅ BON: Préfixer avec "use"
export function useCustomHook<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  return [value, setValue] as const;
}
```

### TailwindCSS

```tsx
// ✅ BON: Classes utilitaires
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">

// ✅ BON: Utiliser cn() pour conditions
import { cn } from "@/lib/utils";
<div className={cn("base-class", isActive && "active-class")}>

// ❌ MAUVAIS: CSS inline
<div style={{ display: "flex", padding: "24px" }}>
```

### Traductions

```tsx
// ✅ BON: Toujours utiliser t()
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
<h1>{t("hero.title")}</h1>

// ❌ MAUVAIS: Texte en dur
<h1>Bienvenue chez Marhaban Canada</h1>
```

---

## 🎯 COMPOSANTS ET HOOKS DISPONIBLES

### Composants Optimisés

```tsx
// Image optimisée avec lazy loading
import OptimizedImage from "@/components/OptimizedImage";
<OptimizedImage
  src="/images/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority={false}
/>

// Image avec Intersection Observer
import LazyImage from "@/components/LazyImage";
<LazyImage src="/images/pack.jpg" alt="Pack Premium" />
```

### Hooks de Performance

```tsx
// Debounce (recherche, validation)
import { useDebounce } from "@/hooks/useDebounce";
const debouncedValue = useDebounce(value, 500);

// Intersection Observer (animations, lazy load)
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

// Media queries
import { useIsMobile, useIsDesktop } from "@/hooks/useMediaQuery";
const isMobile = useIsMobile();
```

---

## 🚀 WORKFLOW DE DÉVELOPPEMENT

### 1. Démarrage

```bash
# Vérifier l'environnement
./check.sh

# Installer les dépendances (première fois)
./setup.sh

# Lancer le projet
./dev.sh

# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

### 2. Créer une Nouvelle Feature

```bash
# Créer une branche
git checkout -b feature/nom-de-la-feature

# Développer
# - Modifier les fichiers
# - Tester en local

# Vérifier la qualité
cd frontend
npm run typecheck  # Vérifier TypeScript
npm run lint       # Vérifier ESLint
npm run build      # Vérifier que le build passe

# Commit
git add .
git commit -m "feat: description de la feature"
git push origin feature/nom-de-la-feature
```

### 3. Standards de Commit

Utiliser **Conventional Commits**:

```bash
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage (pas de changement de code)
refactor: Refactoring
perf: Amélioration de performance
test: Ajout de tests
chore: Tâches de maintenance
```

---

## 📝 TÂCHES PRIORITAIRES

### 🔴 Priorité Haute (Cette Semaine)

1. **Optimiser les Images**
   - Remplacer tous les `<img>` par `<OptimizedImage>`
   - Ajouter alt text descriptifs
   - Compresser les images lourdes

2. **Ajouter Debounce**
   - Recherche FAQ
   - Recherche Blog
   - Validation formulaires

3. **Animations au Scroll**
   - Section "Pourquoi Marhaban"
   - Packs
   - Témoignages
   - Processus

4. **Tests**
   - Tests unitaires des nouveaux hooks
   - Tests d'intégration ContactForm
   - Tests E2E page d'accueil

### 🟡 Priorité Moyenne (Ce Mois)

5. **Convertir JSX → TSX**
   - 60+ fichiers .jsx à convertir
   - Ajouter types appropriés

6. **Accessibilité (a11y)**
   - Audit WCAG 2.1 AA
   - ARIA labels manquants
   - Navigation clavier
   - Contraste des couleurs

7. **SEO Avancé**
   - Schema.org complet (FAQPage, BreadcrumbList)
   - Sitemap dynamique
   - Hreflang tags (FR/EN/AR)

8. **Analytics**
   - Implémenter Google Analytics 4
   - Tracking des conversions
   - Événements personnalisés

### 🟢 Priorité Basse (Plus Tard)

9. **PWA Avancée**
   - Mode offline complet
   - Push notifications
   - Installation prompt

10. **Optimisations**
    - Code splitting avancé
    - Prefetching intelligent
    - Service Worker optimisé

---

## 🎨 GUIDELINES DESIGN

### Espacement

```tsx
// Utiliser la scale Tailwind
gap-2    // 8px
gap-4    // 16px
gap-6    // 24px
gap-8    // 32px

p-4      // padding 16px
p-6      // padding 24px
p-8      // padding 32px
```

### Bordures

```tsx
rounded-lg    // 0.5rem (8px)
rounded-xl    // 0.75rem (12px)
rounded-2xl   // 1rem (16px)
rounded-full  // 9999px
```

### Ombres

```tsx
shadow-sm     // Légère
shadow-md     // Moyenne
shadow-lg     // Grande
shadow-xl     // Très grande
```

### Animations

```tsx
// Transitions
transition-all duration-300

// Hover states
hover:scale-[1.02]
hover:shadow-lg

// Active states
active:scale-[0.98]
```

---

## 🔒 SÉCURITÉ

### Frontend

```tsx
// ✅ Toujours valider avec Zod
const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(8).max(20),
});

// ✅ Sanitize user input
const cleanInput = input.trim();

// ✅ HTTPS en production
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Backend

```javascript
// ✅ Helmet pour les headers de sécurité
app.use(helmet());

// ✅ CORS configuré
app.use(cors({ origin: allowedOrigins }));

// ✅ Rate limiting
app.use('/api', apiLimiter);

// ✅ Validation Zod
const validated = schema.parse(data);
```

---

## 📊 MÉTRIQUES DE QUALITÉ

### Objectifs Lighthouse

- **Performance:** ≥ 90
- **Accessibility:** ≥ 90
- **Best Practices:** ≥ 90
- **SEO:** 100

### Code Quality

- **TypeScript:** 0 erreurs
- **ESLint:** 0 warnings
- **Test Coverage:** ≥ 80%

---

## 🐛 DÉPANNAGE

### Erreurs Courantes

**1. Port déjà utilisé**
```bash
# Tuer le processus sur le port 8080
lsof -ti:8080 | xargs kill -9
```

**2. node_modules corrompus**
```bash
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript errors**
```bash
# Vérifier la version
npm run typecheck

# Redémarrer le serveur TypeScript
Ctrl+Shift+P > TypeScript: Restart TS Server
```

**4. Traductions manquantes**
```bash
# Vérifier que la clé existe dans tous les fichiers
grep -r "hero.title" frontend/src/i18n/locales/
```

---

## 📚 RESSOURCES

### Documentation

- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Vite:** https://vitejs.dev
- **TailwindCSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **i18next:** https://www.i18next.com
- **React Hook Form:** https://react-hook-form.com
- **Zod:** https://zod.dev

### Guides du Projet

- `README.md` - Vue d'ensemble
- `QUICK_START.md` - Démarrage rapide
- `frontend/DEVELOPMENT_GUIDE.md` - Guide frontend complet
- `AMELIORATIONS.md` - Améliorations site
- `AMELIORATIONS_CODE_FRONTEND.md` - Améliorations code
- `OUVRIR_VSCODE.md` - Guide VS Code

---

## 💡 PROMPT POUR IA

```
Tu es un développeur senior travaillant sur Marhaban Canada, une plateforme
full-stack (React + TypeScript + Express) d'accompagnement pour nouveaux
arrivants au Canada.

CONTEXTE:
- Stack: React 18 + TypeScript + TailwindCSS / Node.js + Express
- Design: Palette Marhaban (bleu #1F3A5F, or #BFA45B, beige #FDF8F3)
- i18n: FR/EN/AR avec support RTL
- Components: shadcn/ui
- Hooks disponibles: useDebounce, useIntersectionObserver, useMediaQuery
- Components optimisés: OptimizedImage, LazyImage

RÈGLES:
1. TOUJOURS typer avec TypeScript (pas de any)
2. TOUJOURS traduire les textes avec t() de i18next
3. TOUJOURS utiliser TailwindCSS (pas de CSS inline)
4. TOUJOURS utiliser OptimizedImage au lieu de <img>
5. TOUJOURS valider avec Zod
6. TOUJOURS ajouter alt text descriptifs
7. TOUJOURS utiliser les couleurs Marhaban

COMPOSANTS DISPONIBLES:
- shadcn/ui: Button, Input, Select, Card, Alert, etc.
- Custom: OptimizedImage, LazyImage
- Hooks: useDebounce, useIntersectionObserver, useIsMobile, useIsDesktop

STRUCTURE:
- Composants dans src/components/
- Hooks dans src/hooks/
- Pages dans src/pages/
- Traductions dans src/i18n/locales/{fr,en,ar}/common.json

Ton objectif est d'écrire du code de qualité professionnelle, performant,
accessible (WCAG 2.1 AA) et maintenable.
```

---

## 🎯 CHECKLIST DE DÉVELOPPEMENT

Avant chaque commit:

- [ ] TypeScript: `npm run typecheck` passe
- [ ] ESLint: `npm run lint` passe
- [ ] Build: `npm run build` réussit
- [ ] Tests: Les tests passent
- [ ] Traductions: Textes traduits en FR/EN/AR
- [ ] Accessibilité: Alt text, ARIA labels
- [ ] Performance: Images optimisées, lazy loading
- [ ] Responsive: Testé mobile/tablet/desktop
- [ ] Documentation: Composants documentés

---

## 🎉 CONCLUSION

Ce prompt vous donne tout ce dont vous avez besoin pour développer sur
Marhaban Canada de manière professionnelle et cohérente.

**Questions?** Consultez les guides dans le projet ou demandez à l'équipe.

**Bon développement! 🚀**

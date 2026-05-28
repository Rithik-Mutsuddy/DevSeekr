# DevSeekr
Projet dev par Ricardo, Rithik, Ludmyla, Dogukan et Yanis sur le sujet de recrutement developpeurs.
# DevSeekr

Plateforme mobile de recherche d'emploi pour développeurs juniors. Équivalent de Indeed pour les profils débutants en développement.

---

## Équipe

- Rithik Mutsuddy
- Ricardo
- Yanis
- Liudmyla
- Dogukan

**Durée du projet :** 3 jours  
**Statut :** En développement (Mobile & Design System)

---

## Stack Technique

### Frontend (React Native & Web)

| Technologie | Version |
|-------------|---------|
| React | 18.3.1 |
| React DOM | 18.3.1 |
| Vite | 6.3.5 |
| TypeScript | Dernière stable |
| Tailwind CSS | 4.1.12 |
| React Router | 7.13.0 |

### UI & Components

| Librairie | Version | Usage |
|-----------|---------|-------|
| shadcn/ui | - | Composants réutilisables |
| Radix UI | 1.x | Primitives accessibles |
| Material-UI | 7.3.5 | Icônes & composants |
| Lucide React | 0.487.0 | Icônes personnalisées |

### Outils & Build

| Outil | Version |
|-------|---------|
| Vite | 6.3.5 |
| @tailwindcss/vite | 4.1.12 |
| PostCSS | (Via Tailwind Vite) |

### Runtime

| Environment | Version |
|-------------|---------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x ou pnpm ≥ 8.x |

---

## Architecture & Structure

```
DevSeekr/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/                    # Composants shadcn/ui
│   │   │   ├── figma/                 # Composants Figma générés
│   │   │   ├── screens/
│   │   │   │   ├── SplashScreen.tsx
│   │   │   │   ├── OnboardingScreen.tsx
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── SignupScreen.tsx
│   │   │   │   ├── HomeScreen.tsx
│   │   │   │   ├── JobDetailScreen.tsx
│   │   │   │   ├── FavoritesScreen.tsx
│   │   │   │   └── ProfileScreen.tsx
│   │   └── App.tsx                    # Composant racine
│   ├── styles/
│   │   ├── globals.css
│   │   ├── theme.css
│   │   ├── tailwind.css
│   │   └── fonts.css
│   ├── imports/                       # Assets (logos, images)
│   └── main.tsx                       # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Screens & Fonctionnalités

| Screen | Chemin | Statut | Rôle |
|--------|--------|--------|------|
| Splash | `/splash` | ✅ Design | Écran de chargement (1-2s) |
| Onboarding | `/onboarding` | ✅ Design | Introduction à l'app |
| Connexion | `/login` | ✅ Design | Authentification email/password |
| Inscription | `/signup` | ✅ Design | Création compte + sélection compétences |
| Accueil | `/home` | ✅ Design | Feed jobs + filtres (searchbar, skills) |
| Détail Job | `/job/:id` | ✅ Design | Vue complète offre + bouton candidature |
| Favoris | `/favorites` | ✅ Design | Jobs sauvegardés (persistence AsyncStorage) |
| Profil | `/profile` | ✅ Design | Infos user + compétences + paramètres |

---

## Décisions Architecturales

### 1. **Vite + React TypeScript**
- Performance build (2-3s vs webpack 30-40s)
- HMR ultra-rapide pour dev
- TypeScript natif (typage complet)
- Configuration minimale

### 2. **Tailwind CSS + shadcn/ui**
- Design system cohérent
- Composants accessibles (Radix UI)
- Pas de build CSS complexe
- Maintenance facilitée

### 3. **Structure par Screens**
- Mapping direct Figma → Code
- Séparation claire auth/app
- Scalabilité future (ajout de screens)

### 4. **Assets du Figma**
- Import automatique via `figma:asset/`
- Logo & images stockés dans `src/imports/`
- Plugin custom `figmaAssetResolver()` en Vite

### 5. **State Management**
- Context API (simple)
- AsyncStorage pour favoris (persistence locale)
- Firebase Auth (intégration prévue)

### 6. **Responsive Design**
- Mobile-first (Tailwind)
- Breakpoints Tailwind standard
- Tests sur iPhone 12+ & Android (Expo Go prévu)

---

## Installation & Setup

### Prérequis

```bash
Node.js >= 18.0.0
npm >= 9.0.0 ou pnpm >= 8.0.0
```

### Installation locale

```bash
# 1. Cloner le repository
git clone https://github.com/Rithik-Mutsuddy/DevSeekr.git
cd DevSeekr

# 2. Installer les dépendances
npm install

# 3. Lancer le dev server
npm run dev

# 4. Accéder à l'app
# Ouvre http://localhost:5173 dans ton navigateur
```

---

## Git Workflow

### Cloner le repository

```bash
git clone https://github.com/Rithik-Mutsuddy/DevSeekr.git
cd DevSeekr
```

### Créer une branche de dev

```bash
# Format de branche : feature/nom-feature ou bugfix/nom-bug

# Exemple : nouvelles fonctionnalités
git checkout -b feature/add-job-filters

# Exemple : corrections bugs
git checkout -b bugfix/login-email-validation

# Exemple : améliorations UI
git checkout -b feature/improve-splash-animation
```

### Workflow complet

```bash
# 1. Se placer sur main et synchroniser
git checkout main
git pull origin main

# 2. Créer sa branche
git checkout -b feature/your-feature-name

# 3. Développer & committer
git add .
git commit -m "feat: description courte en anglais"

# 4. Push la branche
git push origin feature/your-feature-name

# 5. Créer une Pull Request sur GitHub
# - Titre clair
# - Description de la feature/bugfix
# - Tests effectués
# - Screenshots si UI change

# 6. Review & Merge (via GitHub)
# Une fois approuvé, merge via GitHub UI

# 7. Nettoyer localement
git checkout main
git pull origin main
git branch -d feature/your-feature-name
```

### Convention de commit

```bash
feat: ajoute nouvelle fonctionnalité
fix: corrige un bug
refactor: améliore le code sans changer le comportement
style: changes formatage/CSS
docs: met à jour la documentation
test: ajoute ou modifie des tests
```

### Exemple concret

```bash
git add src/app/components/screens/LoginScreen.tsx
git commit -m "feat: validation email en temps réel sur LoginScreen"
git push origin feature/email-validation
```

---

## Déploiement

### Build pour production

```bash
# 1. Générer le bundle optimisé
npm run build

# 2. Le dossier `dist/` contient les fichiers statiques
# Prêt pour deployment statique
```

### Options de déploiement

#### Option 1 : Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Deploy
vercel

# Avec custom domain
vercel --prod
```

#### Option 2 : Netlify
```bash
# Drag & drop du dossier dist/
# Ou via CLI :
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3 : GitHub Pages
```bash
# Pour deployment automatique depuis main
# Config dans package.json :
"deploy": "npm run build && gh-pages -d dist"
npm run deploy
```

#### Option 4 : Expo Go (Mobile)
```bash
# Setup Expo (prévu prochainement)
# npm install -g expo-cli

# Build pour iOS & Android
# eas build --platform ios --platform android

# Déployer sur App Store / Play Store
# eas submit
```

---

## Développement

### Ajouter un nouveau screen

```bash
# 1. Créer le fichier
touch src/app/components/screens/NewScreen.tsx

# 2. Créer le composant
# src/app/components/screens/NewScreen.tsx
export function NewScreen() {
  return <div className="w-full h-screen">New Screen</div>
}

# 3. L'ajouter dans App.tsx
# import { NewScreen } from "./components/screens/NewScreen"
# Puis ajouter dans le grid

# 4. Router si nécessaire (avec React Router)
```

### Ajouter un composant réutilisable

```bash
# 1. Créer dans src/app/components/ui/
touch src/app/components/ui/ButtonCustom.tsx

# 2. Implémenter avec Tailwind + Radix
# 3. Exporter et utiliser dans les screens
```

### Modifier le design (Tailwind)

```bash
# Tous les styles sont en classes Tailwind
# Exemples :
// Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click me
</button>

// Card
<div className="bg-white rounded-lg shadow-lg p-6">
  Content
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Items
</div>
```

---

## Scripts disponibles

| Script | Command | Rôle |
|--------|---------|------|
| Démarrage dev | `npm run dev` | Lance Vite en dev mode (HMR) |
| Build prod | `npm run build` | Génère `dist/` optimisé |
| Preview | `npm run preview` | Preview du build local |
| Lint | `npm run lint` | (À ajouter) |
| Test | `npm run test` | (À ajouter) |

---

## Prochaines étapes

### Court terme (semaine 1)
- [ ] Intégrer Firebase Auth (Connexion/Inscription)
- [ ] Connecter API jobs (mock data ou API réelle)
- [ ] Implémenter AsyncStorage pour favoris
- [ ] Tests manuels complets

### Moyen terme
- [ ] Tests unitaires (Jest + React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Optimisation performance (Lighthouse 90+)
- [ ] SEO (si déploiement web)

### Long terme
- [ ] Export vers Expo Native (iOS/Android)
- [ ] Notifications push
- [ ] Analytics
- [ ] Maintenance & support

---

## Ressources

- **Figma Design :** https://www.figma.com/design/a8r0dE6gz16ZrjhsdUq3ta/Job-Finder-Junior-Dev-App
- **GitHub Repository :** https://github.com/Rithik-Mutsuddy/DevSeekr
- **Docs Tailwind :** https://tailwindcss.com/docs
- **Docs shadcn/ui :** https://ui.shadcn.com/
- **Docs Vite :** https://vitejs.dev/
- **Docs React Router :** https://reactrouter.com/

---

## Support & Questions

Pour toute question ou problème :
1. Vérifier les issues GitHub existantes
2. Créer une issue avec description détaillée
3. Contacter l'équipe DevSeekr sur Slack/Email

---

## Licence

MIT

---

**Dernière mise à jour :** 28 mai 2026  

# 🏰 Graal RC - Site de Téléchargement

Site web magnifique de style médiéval Graal Online pour le téléchargement du client Graal RC avec système d'accès béta contrôlé.

## ✨ Fonctionnalités

- 🎨 **Design Magnifique** - Interface inspirée de Graal Online avec thème médiéval doré
- 🔐 **Authentification Sécurisée** - Inscription avec validation d'email obligatoire
- 📧 **Emails Personnalisés** - Emails HTML stylisés pour la vérification
- 📜 **Licence EULA** - Acceptation de licence avant téléchargement
- 💾 **Téléchargements Multi-plateformes** - Windows, macOS, Linux (AppImage + DEB)
- 🗄️ **Base de Données** - Supabase pour la gestion des utilisateurs
- 🚀 **Déploiement Simple** - One-click deploy sur Vercel
- 📊 **Tracking** - Suivi des téléchargements par utilisateur et plateforme

## 🛠️ Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 avec thème personnalisé
- **Base de Données**: Supabase (PostgreSQL)
- **Email**: Nodemailer (SMTP)
- **Hébergement**: Vercel
- **Binaires**: GitHub Releases

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase
- Compte SMTP (Gmail, SendGrid, etc.)

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/graalrc-download-site.git

# Aller dans le dossier
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env

# Configurer les variables dans .env
# Voir DEPLOYMENT_GUIDE.md pour les détails
```

### Configuration

Éditez `.env` avec vos propres valeurs:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre_mot_de_passe_app

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=secret_aleatoire_securise
```

### Lancer en développement

```bash
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && npm run dev
```

Visitez http://localhost:3000

## 📚 Documentation

- [Guide de Déploiement Complet](./DEPLOYMENT_GUIDE.md)
- [Schéma de Base de Données](./supabase/schema.sql)

## 🎨 Thème Personnalisé

Le site utilise un thème personnalisé inspiré de Graal Online:

### Couleurs

```css
graal-dark: #0a0e1a      /* Fond principal */
graal-darker: #050810    /* Fond plus sombre */
graal-primary: #d4af37   /* Or principal */
graal-secondary: #8b7355 /* Or secondaire */
graal-accent: #c9a961    /* Accent doré */
```

### Polices

- **Titres**: Cinzel (médiévale)
- **Corps**: Inter (moderne)

### Composants Réutilisables

```css
.btn-primary        /* Bouton doré principal */
.btn-secondary      /* Bouton contour doré */
.card-graal         /* Carte avec bordure dorée */
.input-graal        /* Input avec style Graal */
.medieval-title     /* Titre médiéval */
```

## 📁 Structure du Projet

```
graalrc-download-site/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── signup/route.ts     # Inscription
│   │       └── verify/route.ts     # Vérification email
│   ├── download/page.tsx           # Page téléchargement
│   ├── license/page.tsx            # Page licence
│   ├── signup/page.tsx             # Page inscription
│   ├── verify/page.tsx             # Page vérification
│   ├── layout.tsx                  # Layout global
│   ├── page.tsx                    # Page d'accueil
│   └── globals.css                 # Styles globaux
├── lib/
│   └── supabase.ts                 # Client Supabase
├── supabase/
│   └── schema.sql                  # Schéma DB
├── public/                         # Assets statiques
├── package.json
├── tailwind.config.ts              # Config Tailwind
├── tsconfig.json                   # Config TypeScript
├── vercel.json                     # Config Vercel
├── DEPLOYMENT_GUIDE.md             # Guide déploiement
└── README.md                       # Ce fichier
```

## 🔄 Workflow Utilisateur

1. **Visite du Site** → Page d'accueil magnifique
2. **Inscription** → Entre son email
3. **Vérification** → Reçoit un email avec lien
4. **Confirmation** → Clique sur le lien dans l'email
5. **Licence** → Lit et accepte l'EULA
6. **Téléchargement** → Choisit sa plateforme et télécharge

## 🔐 Sécurité

- ✅ Validation d'email obligatoire
- ✅ Tokens de vérification avec expiration (24h)
- ✅ Headers de sécurité (HTTPS, CSP, etc.)
- ✅ RLS activé sur Supabase
- ✅ Variables sensibles dans .env
- ✅ Pas de source code dans les releases

## 📊 Base de Données

### Tables

**beta_users**
- id (UUID)
- email (VARCHAR)
- email_verified (BOOLEAN)
- verification_token (VARCHAR)
- verification_expires_at (TIMESTAMP)
- beta_access (BOOLEAN)
- license_accepted (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**downloads**
- id (UUID)
- user_id (UUID → beta_users)
- platform (VARCHAR)
- version (VARCHAR)
- downloaded_at (TIMESTAMP)

## 🎯 Roadmap

- [ ] Page de connexion (login)
- [ ] Dashboard utilisateur
- [ ] Historique des téléchargements
- [ ] Rate limiting avancé
- [ ] Support multilingue
- [ ] Dark mode toggle
- [ ] Système de notifications
- [ ] API publique

## 🤝 Contribution

Les contributions sont bienvenues! Pour contribuer:

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Créé avec ❤️ pour la communauté Graal Online

## 🙏 Remerciements

- Design inspiré de [Graal Online](https://graalonline.com)
- Framework [Next.js](https://nextjs.org)
- UI avec [Tailwind CSS](https://tailwindcss.com)
- Backend [Supabase](https://supabase.com)
- Hébergement [Vercel](https://vercel.com)

---

**Note**: Ce site nécessite les binaires Graal RC à déployer sur GitHub Releases. Consultez le [Guide de Déploiement](./DEPLOYMENT_GUIDE.md) pour les instructions complètes.

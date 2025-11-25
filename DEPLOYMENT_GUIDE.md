# Guide de Déploiement - Graal RC Download Site

Ce guide vous accompagne étape par étape pour déployer le site web de téléchargement Graal RC sur Vercel avec Supabase.

## 📋 Prérequis

- Compte [Vercel](https://vercel.com)
- Compte [Supabase](https://supabase.com)
- Compte GitHub (pour héberger les binaires)
- Compte SMTP (Gmail, SendGrid, etc.)
- Node.js 18+ installé localement

## 🗄️ Étape 1: Configuration de Supabase

### 1.1 Créer un nouveau projet Supabase

1. Allez sur https://supabase.com
2. Cliquez sur "New Project"
3. Nommez votre projet (ex: `graalrc-download`)
4. Choisissez une région proche de vos utilisateurs
5. Définissez un mot de passe fort pour la base de données

### 1.2 Exécuter le schéma de base de données

1. Dans le dashboard Supabase, allez dans `SQL Editor`
2. Créez une nouvelle requête
3. Copiez le contenu de `supabase/schema.sql`
4. Exécutez la requête
5. Vérifiez que les tables `beta_users` et `downloads` sont créées

### 1.3 Récupérer les clés API

1. Allez dans `Settings` > `API`
2. Copiez:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 📧 Étape 2: Configuration SMTP

### Option A: Gmail App Password

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Allez dans `Sécurité` > `Mots de passe des applications`
3. Créez un nouveau mot de passe d'application pour "Mail"
4. Copiez le mot de passe généré

**Variables:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=mot_de_passe_application
```

### Option B: SendGrid

1. Créez un compte sur https://sendgrid.com
2. Créez une clé API
3. Vérifiez votre domaine d'envoi

**Variables:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre_cle_api_sendgrid
```

## 🚀 Étape 3: Déploiement sur Vercel

### 3.1 Préparer le dépôt Git

```bash
cd graalrc-download-site
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/graalrc-download.git
git push -u origin main
```

### 3.2 Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "New Project"
3. Importez votre dépôt GitHub
4. Configurez les variables d'environnement:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://votre-site.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=mot_de_passe_application
JWT_SECRET=un_secret_aleatoire_securise
```

5. Cliquez sur "Deploy"

### 3.3 Générer JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📦 Étape 4: Upload des Binaires sur GitHub Releases

### 4.1 Créer une release sur GitHub

```bash
# Dans le dépôt rc/ (pas graalrc-download-site)
cd ../rc
git tag -a v1.0.2 -m "Release v1.0.2"
git push origin v1.0.2
```

### 4.2 Uploader les binaires

1. Allez sur GitHub > Releases
2. Cliquez sur "Draft a new release"
3. Sélectionnez le tag `v1.0.2`
4. Uploadez les fichiers depuis `rc-artifacts/`:
   - RC-GTK3-Windows-1.0.2.exe
   - RC-GTK3-macOS-1.0.2.dmg
   - RC-GTK3-Linux-1.0.2.AppImage
   - RC-GTK3-Linux-1.0.2.deb

5. Publiez la release

### 4.3 Script automatique pour upload

Créez `rc/scripts/upload-release.sh`:

```bash
#!/bin/bash

VERSION="1.0.2"
GITHUB_REPO="votre-username/graal-rc"
GITHUB_TOKEN="votre_token_github"

# Upload des fichiers
gh release create "v${VERSION}" \
  --repo "${GITHUB_REPO}" \
  --title "Graal RC ${VERSION}" \
  --notes "Version ${VERSION} - Accès Béta" \
  ../rc-artifacts/RC-GTK3-Windows-${VERSION}.exe \
  ../rc-artifacts/RC-GTK3-macOS-${VERSION}.dmg \
  ../rc-artifacts/RC-GTK3-Linux-${VERSION}.AppImage \
  ../rc-artifacts/RC-GTK3-Linux-${VERSION}.deb
```

## 🔄 Étape 5: Créer l'API de téléchargement

Créez `graalrc-download-site/app/api/download/[platform]/[file]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

const GITHUB_REPO = 'votre-username/graal-rc'
const VERSION = '1.0.2'

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string; file: string } }
) {
  try {
    const { platform, file } = params
    
    // Construire l'URL du fichier sur GitHub Releases
    const githubUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${file}`
    
    // Rediriger vers le fichier
    return NextResponse.redirect(githubUrl)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de téléchargement' },
      { status: 500 }
    )
  }
}
```

## ✅ Étape 6: Vérification

### 6.1 Tester le site localement

```bash
cd graalrc-download-site
npm run dev
```

Visitez http://localhost:3000 et testez:
1. ✅ Page d'accueil s'affiche
2. ✅ Inscription avec email
3. ✅ Réception de l'email de vérification
4. ✅ Vérification du lien
5. ✅ Acceptation de la licence
6. ✅ Page de téléchargement accessible
7. ✅ Téléchargement des fichiers fonctionne

### 6.2 Tester en production

1. Visitez votre site Vercel
2. Testez le flux complet d'inscription
3. Vérifiez les logs dans Vercel Dashboard
4. Vérifiez les données dans Supabase

## 🔧 Étape 7: Configuration avancée

### 7.1 Domaine personnalisé (optionnel)

1. Dans Vercel > Settings > Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions
4. Mettez à jour `NEXT_PUBLIC_APP_URL`

### 7.2 Monitoring et Analytics

1. Activez Vercel Analytics
2. Configurez Supabase Auth logs
3. Ajoutez Google Analytics (optionnel)

### 7.3 Rate Limiting (recommandé)

Installez Upstash Redis pour le rate limiting:

```bash
npm install @upstash/redis @upstash/ratelimit
```

## 📊 Étape 8: Gestion des utilisateurs

### 8.1 Approuver manuellement les accès béta

Dans Supabase SQL Editor:

```sql
-- Voir tous les utilisateurs en attente
SELECT email, created_at, email_verified 
FROM beta_users 
WHERE beta_access = false;

-- Approuver un utilisateur
UPDATE beta_users 
SET beta_access = true 
WHERE email = 'user@example.com';
```

### 8.2 Statistiques de téléchargement

```sql
-- Nombre de téléchargements par plateforme
SELECT platform, COUNT(*) as count 
FROM downloads 
GROUP BY platform;

-- Derniers téléchargements
SELECT u.email, d.platform, d.version, d.downloaded_at
FROM downloads d
JOIN beta_users u ON d.user_id = u.id
ORDER BY d.downloaded_at DESC
LIMIT 10;
```

## 🚨 Dépannage

### Problème: Emails non reçus

1. Vérifiez les logs Vercel
2. Vérifiez que les variables SMTP sont correctes
3. Testez la connexion SMTP:

```bash
node -e "
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: { user: 'votre@email.com', pass: 'password' }
});
transport.verify().then(console.log).catch(console.error);
"
```

### Problème: Erreurs Supabase

1. Vérifiez les clés API
2. Vérifiez que le schéma est bien créé
3. Vérifiez les politiques RLS

### Problème: Téléchargements échouent

1. Vérifiez que les fichiers existent sur GitHub Releases
2. Vérifiez l'URL dans l'API route
3. Vérifiez les permissions du repository

## 🔐 Sécurité

### Checklist de sécurité

- [x] Variables d'environnement stockées sur Vercel (jamais dans le code)
- [x] HTTPS activé (automatique avec Vercel)
- [x] Headers de sécurité configurés (vercel.json)
- [x] Rate limiting sur les endpoints sensibles
- [x] Validation d'email obligatoire
- [x] Tokens de vérification avec expiration
- [x] RLS activé sur Supabase

## 📝 Maintenance

### Mise à jour des binaires

1. Buildez une nouvelle version
2. Uploadez sur GitHub Releases
3. Mettez à jour `DOWNLOAD_VERSION` dans `app/download/page.tsx`
4. Redéployez sur Vercel

### Sauvegardes

1. Supabase fait des sauvegardes automatiques
2. Exportez régulièrement la liste des users:

```sql
COPY (SELECT * FROM beta_users) TO '/tmp/beta_users_backup.csv' CSV HEADER;
```

## 🎉 Terminé!

Votre site de téléchargement Graal RC est maintenant déployé et opérationnel!

**URLs importantes:**
- Site web: https://votre-site.vercel.app
- Supabase: https://app.supabase.com/project/votre-projet
- Vercel: https://vercel.com/dashboard
- GitHub Releases: https://github.com/votre-username/graal-rc/releases

Pour toute question, consultez la documentation officielle de Vercel et Supabase.

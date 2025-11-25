# 🚀 Guide de Démarrage Rapide

Configuration et déploiement du site Graal RC en 5 minutes!

## ⚡ Installation Express

```bash
# Depuis le dossier parent de Rc-sources
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site

# 1. Installer les dépendances
npm install

# 2. Copier et configurer l'environnement
cp .env.example .env
# Éditez .env avec vos clés Supabase et SMTP
```

## 🗄️ Configuration Supabase (2 minutes)

1. **Créer un projet**: https://app.supabase.com
2. **Exécuter le schéma SQL**:
   - Allez dans SQL Editor
   - Copiez le contenu de `supabase/schema.sql`
   - Exécutez la requête
3. **Récupérer les clés**:
   - Settings > API
   - Copiez `Project URL` et `anon public key`
   - Ajoutez-les dans `.env`

## 📧 Configuration Email (1 minute)

### Gmail App Password

```bash
# Dans .env:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@gmail.com
SMTP_PASS=votre_mot_de_passe_app  # Créé dans Google Account Security
```

## 🚀 Déploiement sur Vercel (1 commande)

```bash
# Déploiement automatique
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/deploy-vercel.sh
```

Le script va:
- ✅ Vérifier les prérequis
- ✅ Installer Vercel CLI si nécessaire
- ✅ Build le projet
- ✅ Déployer sur Vercel
- ✅ Configurer les variables d'environnement

## 📦 Upload des Binaires (1 commande)

```bash
# Upload des binaires
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/upload-binaries.sh 1.0.2
```

⚠️ **Avant d'exécuter**, éditez le script pour mettre votre repo GitHub:
```bash
# Dans scripts/upload-binaries.sh, ligne 7:
GITHUB_REPO="votre-username/graal-rc"  # Modifier ici
```

Le script va:
- ✅ Créer le tag Git
- ✅ Créer la release GitHub
- ✅ Uploader les 4 binaires (Windows, macOS, Linux x2)
- ✅ Générer les checksums
- ✅ Publier la release

## ✅ Vérification Rapide

```bash
# Tester localement (ignorer les erreurs TypeScript)
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && npm run dev
# Visitez http://localhost:3000
```

**Checklist:**
- [ ] Page d'accueil s'affiche
- [ ] Inscription fonctionne
- [ ] Email de vérification reçu
- [ ] Lien de vérification fonctionne
- [ ] Page de licence s'affiche
- [ ] Page de téléchargement accessible

## 🔧 Dépannage Express

### Erreur "Cannot find module 'next'"
```bash
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && npm install
```

### Erreur Supabase "Invalid API key"
```bash
# Vérifiez dans .env:
# - NEXT_PUBLIC_SUPABASE_URL doit commencer par https://
# - NEXT_PUBLIC_SUPABASE_ANON_KEY doit être le anon/public key
```

### Emails non reçus
```bash
# Testez la connexion SMTP:
node -e "const nodemailer = require('nodemailer'); nodemailer.createTransport({host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS}}).verify(console.log)"
```

### Vercel CLI non trouvé
```bash
npm install -g vercel
```

## 📚 Documentation Complète

Pour plus de détails, consultez:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Guide complet
- [README.md](./README.md) - Documentation du projet

## 🎯 Workflow Complet

```bash
# 1. Configurer l'environnement
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site
cp .env.example .env
# Éditez .env

# 2. Créer la base de données Supabase
# Exécutez supabase/schema.sql dans SQL Editor

# 3. Déployer le site web
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/deploy-vercel.sh

# 4. Uploader les binaires
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/upload-binaries.sh 1.0.2

# 5. Vérifier en production
# Visitez votre URL Vercel
```

## 🎉 C'est tout!

Votre site est maintenant en ligne et prêt à distribuer Graal RC! 🏰✨

---

**Besoin d'aide?**
- Documentation complète: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- GitHub Issues: Signalez les problèmes

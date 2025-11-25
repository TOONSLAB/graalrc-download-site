# 📋 Instructions de Configuration Finale

Le projet est prêt à 95% ! Il ne reste que 2 étapes de configuration externe que vous devez faire:

## ✅ Déjà Configuré

- ✅ Projet Next.js créé et configuré
- ✅ Dépendances installées
- ✅ Scripts de déploiement prêts
- ✅ Token Vercel configuré dans .env
- ✅ Thème Graal magnifique implémenté
- ✅ Système d'authentification complet

## 🔧 À Configurer (5 minutes)

### 1️⃣ Supabase (2 minutes)

**a) Créer le projet:**
1. Allez sur https://app.supabase.com
2. Cliquez sur "New Project"
3. Nom: `graalrc-download`
4. Mot de passe: choisissez un mot de passe fort
5. Région: choisissez la plus proche

**b) Créer la base de données:**
1. Cliquez sur "SQL Editor" dans le menu gauche
2. Cliquez sur "New query"
3. Copiez tout le contenu de `supabase/schema.sql`
4. Collez dans l'éditeur
5. Cliquez sur "Run" (ou Cmd+Enter)
6. Vérifiez que les tables `beta_users` et `downloads` sont créées

**c) Récupérer les clés API:**
1. Cliquez sur "Settings" (icône engrenage en bas à gauche)
2. Cliquez sur "API" dans le menu
3. Copiez ces 2 valeurs:
   - **Project URL** (commence par https://xxx.supabase.co)
   - **anon public** key (longue chaîne commençant par eyJ...)

**d) Mettre à jour .env:**
Ouvrez `graalrc-download-site/.env` et remplacez:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-url-copiée.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_copiée_ici
```

### 2️⃣ SMTP Gmail (3 minutes)

**a) Activer l'authentification à 2 facteurs:**
1. Allez sur https://myaccount.google.com/security
2. Activez "Validation en deux étapes" si ce n'est pas déjà fait

**b) Créer un mot de passe d'application:**
1. Restez sur la page Sécurité
2. Cherchez "Mots de passe des applications"
3. Cliquez dessus
4. Dans "Sélectionner une application", choisissez "Autre (nom personnalisé)"
5. Tapez "Graal RC"
6. Cliquez sur "Générer"
7. **Copiez le mot de passe de 16 caractères** (avec ou sans espaces)

**c) Mettre à jour .env:**
Ouvrez `graalrc-download-site/.env` et remplacez:
```bash
SMTP_USER=votre-email@gmail.com
SMTP_PASS=le_mot_de_passe_copié
```

## 🚀 Déploiement (1 commande)

Une fois les 2 étapes ci-dessus terminées:

```bash
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/deploy-vercel.sh
```

Le script va:
1. Vérifier les prérequis
2. Installer Vercel CLI
3. Build le projet
4. Déployer automatiquement avec le token fourni
5. Vous donner l'URL de votre site

## ✅ Vérification

Après le déploiement, testez:

1. **Page d'accueil**: https://votre-site.vercel.app
2. **Inscription**: Créez un compte avec votre email
3. **Email**: Vérifiez votre boîte mail
4. **Vérification**: Cliquez sur le lien dans l'email
5. **Licence**: Acceptez la licence
6. **Téléchargement**: Vérifiez que la page s'affiche

## 📦 Upload des Binaires (optionnel maintenant)

Quand les binaires seront prêts:

```bash
cd /Users/unixmad/Documents/Rc-sources/graalrc-download-site && ./scripts/upload-binaries.sh 1.0.2
```

## 🆘 Besoin d'Aide?

Si vous rencontrez un problème:

1. **Erreur Supabase**: Vérifiez que l'URL commence par `https://` et que la clé `anon` est complète
2. **Email non reçu**: Vérifiez le mot de passe d'application Gmail (16 caractères)
3. **Build échoue**: Assurez-vous d'avoir Node.js 18+ installé

## 🎉 C'est Tout!

Une fois configuré, votre site sera en ligne et prêt à distribuer Graal RC! 🏰✨

---

**Temps total estimé**: 5 minutes de configuration + 2 minutes de déploiement = **7 minutes**

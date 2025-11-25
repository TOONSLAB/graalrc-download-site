#!/bin/bash

# Script de déploiement automatique sur Vercel
# Usage: ./scripts/deploy-vercel.sh

set -e

echo "🚀 Déploiement du site Graal RC sur Vercel"
echo "================================================"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
info() {
    echo -e "${GREEN}✓${NC} $1"
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
    exit 1
}

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    error "Erreur: package.json non trouvé. Exécutez ce script depuis le dossier graalrc-download-site/"
fi

info "Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé"
fi
info "Node.js: $(node --version)"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé"
fi
info "npm: $(npm --version)"

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    warn "Vercel CLI n'est pas installé. Installation..."
    npm install -g vercel
fi
info "Vercel CLI installé"

# Vérifier le fichier .env
if [ ! -f ".env" ]; then
    warn "Fichier .env non trouvé. Création depuis .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        warn "IMPORTANT: Éditez le fichier .env avec vos vraies valeurs avant de continuer!"
        echo ""
        echo "Configurations nécessaires:"
        echo "  - NEXT_PUBLIC_SUPABASE_URL"
        echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo "  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS"
        echo "  - JWT_SECRET"
        echo ""
        read -p "Appuyez sur Entrée après avoir configuré .env..."
    else
        error ".env.example non trouvé"
    fi
fi

info "Fichier .env trouvé"

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install

info "Dépendances installées"

# Build local pour vérifier
echo ""
echo "🔨 Build de test en local..."
npm run build

info "Build réussi"

# Se connecter à Vercel
echo ""
echo "🔐 Connexion à Vercel..."
vercel login

# Demander les variables d'environnement
echo ""
echo "📝 Configuration des variables d'environnement Vercel"
echo "================================================"
echo ""

# Lire les variables du fichier .env
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Déployer sur Vercel
echo ""
echo "🚀 Déploiement sur Vercel..."
echo ""

# Premier déploiement (staging)
vercel \
    --yes \
    -e NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
    -e NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    -e NEXT_PUBLIC_APP_URL="$NEXT_PUBLIC_APP_URL" \
    -e SMTP_HOST="$SMTP_HOST" \
    -e SMTP_PORT="$SMTP_PORT" \
    -e SMTP_USER="$SMTP_USER" \
    -e SMTP_PASS="$SMTP_PASS" \
    -e JWT_SECRET="$JWT_SECRET"

info "Déploiement staging réussi"

# Demander si on veut déployer en production
echo ""
read -p "Voulez-vous déployer en production? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Déploiement en production..."
    vercel --prod
    info "Déploiement production réussi!"
else
    info "Déploiement en staging uniquement"
fi

# Afficher l'URL du déploiement
echo ""
echo "================================================"
echo "✅ Déploiement terminé!"
echo ""
echo "Votre site est accessible à:"
vercel ls | head -n 2
echo ""
echo "Pour gérer votre projet:"
echo "  - Dashboard: https://vercel.com/dashboard"
echo "  - Logs: vercel logs"
echo "  - Domaine: vercel domains"
echo ""
echo "Prochaines étapes:"
echo "  1. Vérifiez que le site fonctionne correctement"
echo "  2. Uploadez les binaires sur GitHub Releases"
echo "  3. Testez le flux complet d'inscription"
echo "================================================"

#!/bin/bash

# Script pour uploader les binaires sur GitHub Releases
# Usage: ./scripts/upload-binaries.sh [version]

set -e

VERSION="${1:-1.0.2}"
GITHUB_REPO="TOONSLAB/rc"
RELEASE_DIR="../rc-artifacts"

echo "📦 Upload des binaires Graal RC sur GitHub Releases"
echo "================================================"
echo "Version: v${VERSION}"
echo "Repository: ${GITHUB_REPO}"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

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

# Vérifier GitHub CLI
if ! command -v gh &> /dev/null; then
    error "GitHub CLI (gh) n'est pas installé. Installez-le depuis https://cli.github.com"
fi

info "GitHub CLI installé"

# Vérifier l'authentification
if ! gh auth status &> /dev/null; then
    warn "Non authentifié sur GitHub. Connexion..."
    gh auth login
fi

info "Authentifié sur GitHub"

# Vérifier que le dossier des binaires existe
if [ ! -d "$RELEASE_DIR" ]; then
    error "Dossier $RELEASE_DIR non trouvé"
fi

cd "$RELEASE_DIR"
info "Dossier des binaires trouvé"

# Lister les fichiers disponibles
echo ""
echo "Fichiers trouvés:"
ls -lh *.zip *.exe *.dmg *.AppImage *.deb 2>/dev/null || warn "Aucun fichier binaire trouvé"
echo ""

# Vérifier les fichiers requis
WINDOWS_FILE="RC-GTK3-Windows-${VERSION}.zip"
MACOS_FILE="GraalRC-${VERSION}.dmg"
LINUX_ARCHIVE="RC-GTK3-Linux-${VERSION}.tar.gz"

MISSING_FILES=()

[ ! -f "$WINDOWS_FILE" ] && MISSING_FILES+=("$WINDOWS_FILE")
[ ! -f "$MACOS_FILE" ] && MISSING_FILES+=("$MACOS_FILE")
[ ! -f "$LINUX_ARCHIVE" ] && MISSING_FILES+=("$LINUX_ARCHIVE")

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
    warn "Fichiers manquants:"
    for file in "${MISSING_FILES[@]}"; do
        echo "  - $file"
    done
    echo ""
    read -p "Continuer quand même? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Upload annulé"
    fi
fi

# Créer le tag Git si nécessaire
echo ""
echo "📝 Création du tag Git..."
cd ../rc  # Retour au dossier rc

if git rev-parse "v${VERSION}" >/dev/null 2>&1; then
    warn "Le tag v${VERSION} existe déjà"
else
    git tag -a "v${VERSION}" -m "Release version ${VERSION}"
    git push origin "v${VERSION}"
    info "Tag v${VERSION} créé et poussé"
fi

# Vérifier si la release existe déjà
echo ""
echo "🔍 Vérification de la release existante..."

if gh release view "v${VERSION}" --repo "$GITHUB_REPO" &> /dev/null; then
    warn "La release v${VERSION} existe déjà"
    read -p "Voulez-vous la supprimer et la recréer? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        gh release delete "v${VERSION}" --repo "$GITHUB_REPO" --yes
        info "Release supprimée"
    else
        error "Upload annulé"
    fi
fi

# Créer la release avec notes
echo ""
echo "🚀 Création de la release GitHub..."

RELEASE_NOTES="# Graal RC ${VERSION} - Version Béta

## 📥 Téléchargements

### Windows
- **Archive ZIP**: \`${WINDOWS_FILE}\`
- Configuration requise: Windows 10 ou supérieur

### macOS
- **Image Disque DMG**: \`${MACOS_FILE}\`
- Configuration requise: macOS 10.14 Mojave ou supérieur

### Linux
- **Archive Tarball**: \`${LINUX_ARCHIVE}\` (Générique)
- Configuration requise: Ubuntu 20.04+, Debian 11+, Fedora 35+ (GTK3 requis)

## 🎯 Nouveautés

- Client GTK3 natif pour toutes les plateformes
- Interface modernisée et optimisée
- Support complet du protocole Graal
- Builds statiques (pas besoin d'installer GTK3)

## 📝 Installation

### Windows
1. Téléchargez le fichier .zip
2. Extrayez l'archive
3. Exécutez \`RemoteControl.exe\` dans le sous-dossier \`RC-GTK3-dist\`

### macOS
1. Téléchargez le fichier .dmg
2. Ouvrez l'image disque
3. Glissez Graal RC dans Applications

### Linux
1. Téléchargez l'archive \`.tar.gz\`
2. Extrayez l'archive :
   \`\`\`bash
   tar -xzf ${LINUX_ARCHIVE}
   \`\`\`
3. Lancez l'exécutable :
   \`\`\`bash
   ./RC-GTK3-Linux/RC-gtk3
   \`\`\`

## 🐛 Bugs Connus

- Version béta en cours de test
- Veuillez signaler les problèmes sur GitHub Issues

## 🔐 Checksums

\`\`\`
MD5 checksums disponibles dans les assets
\`\`\`

---

**⚠️ Version Béta**: Cette version est en phase de test. Utilisez avec prudence."

cd "$RELEASE_DIR"

gh release create "v${VERSION}" \
    --repo "$GITHUB_REPO" \
    --title "Graal RC ${VERSION}" \
    --notes "$RELEASE_NOTES" \
    --draft

info "Release créée en mode brouillon"

# Uploader les fichiers
echo ""
echo "⬆️  Upload des fichiers..."

UPLOADED=0

if [ -f "$WINDOWS_FILE" ]; then
    gh release upload "v${VERSION}" "$WINDOWS_FILE" --repo "$GITHUB_REPO"
    info "Windows: $WINDOWS_FILE"
    ((UPLOADED++))
fi

if [ -f "$MACOS_FILE" ]; then
    gh release upload "v${VERSION}" "$MACOS_FILE" --repo "$GITHUB_REPO"
    info "macOS: $MACOS_FILE"
    ((UPLOADED++))
fi

if [ -f "$LINUX_ARCHIVE" ]; then
    gh release upload "v${VERSION}" "$LINUX_ARCHIVE" --repo "$GITHUB_REPO"
    info "Linux Archive: $LINUX_ARCHIVE"
    ((UPLOADED++))
fi

echo ""
info "$UPLOADED fichier(s) uploadé(s)"

# Générer les checksums
echo ""
echo "🔒 Génération des checksums..."
{
    echo "# MD5 Checksums for Graal RC ${VERSION}"
    echo ""
    [ -f "$WINDOWS_FILE" ] && md5sum "$WINDOWS_FILE"
    [ -f "$MACOS_FILE" ] && md5sum "$MACOS_FILE"
    [ -f "$LINUX_ARCHIVE" ] && md5sum "$LINUX_ARCHIVE"
} > checksums.txt

gh release upload "v${VERSION}" checksums.txt --repo "$GITHUB_REPO"
info "Checksums uploadés"

# Publier la release
echo ""
read -p "Publier la release maintenant? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh release edit "v${VERSION}" --repo "$GITHUB_REPO" --draft=false
    info "Release publiée!"
else
    warn "Release laissée en brouillon. Publiez-la manuellement depuis GitHub."
fi

# Afficher l'URL
echo ""
echo "================================================"
echo "✅ Upload terminé!"
echo ""
echo "Release URL:"
gh release view "v${VERSION}" --repo "$GITHUB_REPO" --web 2>/dev/null || echo "https://github.com/${GITHUB_REPO}/releases/tag/v${VERSION}"
echo ""
echo "Prochaines étapes:"
echo "  1. Vérifiez les fichiers sur GitHub"
echo "  2. Mettez à jour DOWNLOAD_VERSION dans le site web"
echo "  3. Déployez le site web sur Vercel"
echo "  4. Testez les téléchargements"
echo "================================================"

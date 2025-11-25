# Guide d'Administration - Graal RC Download Site

## Vue d'ensemble

Le système d'administration permet de déclencher et surveiller les compilations GitHub Actions pour générer les installeurs professionnels Graal RC pour toutes les plateformes.

## Fonctionnalités

### 🚀 Déclenchement de compilation
- Déclencher le workflow GitHub Actions `build-professional-installers.yml`
- Spécifier la version à compiler (format X.Y.Z)
- Compilation automatique pour Windows (NSIS), macOS (DMG) et Linux (DEB + AppImage)

### 📊 Surveillance en temps réel
- Liste des 20 derniers workflows GitHub Actions
- Actualisation automatique toutes les 10 secondes
- Statuts en temps réel: ✅ Success, ❌ Failure, ⏳ In Progress, ⏸️ Queued

### 📝 Logs de compilation
- Visualisation détaillée des logs pour chaque job
- Logs formatés avec coloration syntaxique
- Durée d'exécution pour chaque job
- Troncature automatique après 5000 caractères

## Configuration

### 1. Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env` et dans Vercel:

```bash
# Token GitHub avec permissions workflow
GITHUB_TOKEN=ghp_votre_token_github

# Repository GitHub (optionnel, valeurs par défaut)
GITHUB_REPO_OWNER=TOONSLAB
GITHUB_REPO_NAME=rc
```

### 2. Créer un GitHub Personal Access Token

1. Allez sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Cliquez sur "Generate new token (classic)"
3. Donnez un nom: "GraalRC Download Site Admin"
4. Sélectionnez les scopes suivants:
   - ✅ `repo` (accès complet au repository)
   - ✅ `workflow` (déclencher les workflows)
   - ✅ `read:org` (lire les informations de l'organisation)
5. Générez le token et copiez-le
6. Ajoutez-le dans `.env` et dans les variables d'environnement Vercel

### 3. Configurer Supabase pour les admins

Exécutez le script SQL pour ajouter le support admin:

```bash
# Connectez-vous à Supabase et exécutez:
psql $DATABASE_URL -f supabase/schema-admin.sql
```

Ou dans l'interface Supabase SQL Editor:

```sql
-- Ajouter la colonne is_admin
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Créer un index
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);
```

### 4. Promouvoir un utilisateur en admin

```sql
-- Méthode 1: Utiliser la fonction SQL
SELECT promote_to_admin('votre@email.com');

-- Méthode 2: Update direct
UPDATE profiles 
SET is_admin = TRUE 
WHERE email = 'votre@email.com';

-- Vérifier les admins
SELECT * FROMAdmin_users;
```

### 5. Déployer sur Vercel

```bash
# Ajouter les variables d'environnement
vercel env add GITHUB_TOKEN

# Redéployer
vercel --prod
```

## Utilisation

### Accès à la page admin

Naviguez vers: `https://votre-site.vercel.app/admin`

### Déclencher une nouvelle compilation

1. Entrez la version à compiler (ex: `1.0.3`)
2. Cliquez sur "🚀 Déclencher la compilation"
3. Attendez la confirmation (2-3 secondes)
4. Le workflow apparaîtra dans la liste en statut "queued"

### Suivre la progression

1. La liste se rafraîchit automatiquement toutes les 10 secondes
2. Cliquez sur un workflow pour voir les logs détaillés
3. Les logs se mettent à jour automatiquement
4. Cochez/décochez "Actualisation auto (10s)" pour contrôler le rafraîchissement

### Interpréter les statuts

| Icône | Statut | Description |
|-------|--------|-------------|
| ⏸️ | Queued | En attente de démarrage |
| ⏳ | In Progress | Compilation en cours |
| ✅ | Success | Compilation réussie |
| ❌ | Failure | Compilation échouée |
| ⚠️ | Cancelled | Compilation annulée |

## Architecture technique

### Routes API

#### POST `/api/github/trigger`
Déclenche un workflow GitHub Actions.

**Headers requis:**
```
Content-Type: application/json
x-user-id: <user-id>
```

**Body:**
```json
{
  "version": "1.0.3",
  "workflow": "build-professional-installers.yml"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Compilation déclenchée pour la version 1.0.3",
  "workflow": "build-professional-installers.yml"
}
```

#### GET `/api/github/workflows`
Récupère la liste des workflows récents.

**Headers requis:**
```
x-user-id: <user-id>
```

**Response:**
```json
{
  "workflow_runs": [
    {
      "id": 123456,
      "name": "Build Professional Installers",
      "status": "completed",
      "conclusion": "success",
      "created_at": "2025-01-20T10:00:00Z",
      "html_url": "https://github.com/TOONSLAB/rc/actions/runs/123456"
    }
  ]
}
```

#### GET `/api/github/logs/[runId]`
Récupère les logs détaillés d'un workflow run.

**Headers requis:**
```
x-user-id: <user-id>
```

**Response:**
```json
{
  "jobs": [
    {
      "id": 789,
      "name": "build-windows-installer",
      "status": "completed",
      "conclusion": "success",
      "started_at": "2025-01-20T10:05:00Z",
      "completed_at": "2025-01-20T10:20:00Z",
      "logs": "... full job logs ..."
    }
  ]
}
```

### Sécurité

- ✅ Vérification de l'authentification utilisateur (header `x-user-id`)
- ✅ Vérification des privilèges admin via `requireAdmin()`
- ✅ Token GitHub stocké de manière sécurisée dans les variables d'environnement
- ✅ Pas d'exposition du token côté client
- ✅ Rate limiting automatique de GitHub API

### Performance

- Auto-refresh intelligent (10 secondes par défaut)
- Logs tronqués à 5000 caractères pour optimiser l'affichage
- Cache des workflows pour réduire les appels API
- Indicateurs de chargement pour une meilleure UX

## Workflow de compilation

Le workflow `build-professional-installers.yml` génère:

### Windows (15-20 min)
- ✅ Installeur NSIS professionnel
- ✅ Toutes les DLL GTK3 incluses
- ✅ Menu Démarrer et raccourcis
- ✅ Désinstalleur intégré
- 📦 Fichier: `GraalRC-Setup-{version}.exe`

### macOS (10-15 min)
- ✅ Image disque DMG professionnelle
- ✅ Toutes les dylibs incluses
- ✅ Accord de licence à l'ouverture
- ✅ Drag-and-drop vers Applications
- 📦 Fichier: `GraalRC-{version}.dmg`

### Linux (10-15 min)
- ✅ Package DEB pour Ubuntu/Debian
- ✅ AppImage universel
- ✅ Intégration système complète
- 📦 Fichiers: 
  - `graalrc_{version}_amd64.deb`
  - `GraalRC-{version}-x86_64.AppImage`

## Dépannage

### Erreur: "Token GitHub non configuré"
**Solution:** Vérifiez que `GITHUB_TOKEN` est défini dans les variables d'environnement Vercel.

### Erreur: "Accès refusé"
**Solution:** Assurez-vous que votre utilisateur a `is_admin = TRUE` dans Supabase.

### Les workflows ne se chargent pas
**Solution:** 
1. Vérifiez que le token GitHub a les bonnes permissions
2. Vérifiez que le repository owner/name est correct
3. Consultez les logs Vercel pour plus de détails

### Les logs sont vides
**Solution:** Les logs ne sont disponibles qu'une fois le job terminé. Attendez que le statut passe à "completed".

### L'auto-refresh ne fonctionne pas
**Solution:** 
1. Vérifiez que la case "Actualisation auto" est cochée
2. Ouvrez la console du navigateur pour voir les erreurs
3. Actualisez manuellement la page

## Limites

- **Rate limiting GitHub:** 5000 requêtes/heure avec token
- **Taille des logs:** Tronqués à 5000 caractères dans l'interface
- **Historique:** 20 derniers workflows affichés
- **Durée de compilation:** 15-20 minutes par plateforme

## Bonnes pratiques

1. **Versionnement:** Utilisez le format sémantique X.Y.Z
2. **Test:** Testez les binaires avant de promouvoir en production
3. **Documentation:** Mettez à jour la page download avec la nouvelle version
4. **Communication:** Annoncez les nouvelles versions aux utilisateurs
5. **Monitoring:** Surveillez les workflows pour détecter les échecs rapidement

## Commandes rapides

```bash
# Mettre à jour les variables d'environnement Vercel
vercel env add GITHUB_TOKEN
vercel env add GITHUB_REPO_OWNER
vercel env add GITHUB_REPO_NAME

# Redéployer
vercel --prod

# Voir les logs Vercel en temps réel
vercel logs --follow

# Promouvoir un utilisateur en admin (Supabase)
psql $DATABASE_URL -c "UPDATE profiles SET is_admin = TRUE WHERE email = 'user@example.com';"
```

## Support

Pour toute question ou problème:
1. Consultez les logs dans l'interface admin
2. Vérifiez les logs Vercel
3. Consultez les logs GitHub Actions
4. Contactez l'équipe de développement

---

**Version du guide:** 1.0.0  
**Dernière mise à jour:** 21 novembre 2025

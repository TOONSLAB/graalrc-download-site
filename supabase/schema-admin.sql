-- Ajouter la colonne is_admin à la table profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Créer un index pour améliorer les performances des requêtes admin
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);

-- Fonction pour promouvoir un utilisateur en admin (à exécuter manuellement)
-- Exemple: SELECT promote_to_admin('user@example.com');
CREATE OR REPLACE FUNCTION promote_to_admin(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET is_admin = TRUE
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour révoquer les privilèges admin
-- Exemple: SELECT revoke_admin('user@example.com');
CREATE OR REPLACE FUNCTION revoke_admin(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET is_admin = FALSE
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql;

-- Créer une vue pour lister les administrateurs
CREATE OR REPLACE VIEW admin_users AS
SELECT 
  id,
  email,
  created_at,
  updated_at
FROM profiles
WHERE is_admin = TRUE;

-- Commande exemple pour promouvoir le premier utilisateur en admin:
-- UPDATE profiles SET is_admin = TRUE WHERE email = 'votre@email.com';

-- Création de la table des utilisateurs béta
CREATE TABLE IF NOT EXISTS beta_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_expires_at TIMESTAMP,
  beta_access BOOLEAN DEFAULT FALSE,
  license_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Création de la table des téléchargements
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES beta_users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL CHECK (platform IN ('windows', 'macos', 'linux')),
  version VARCHAR(50) NOT NULL,
  downloaded_at TIMESTAMP DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_beta_users_email ON beta_users(email);
CREATE INDEX IF NOT EXISTS idx_beta_users_verification_token ON beta_users(verification_token);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_platform ON downloads(platform);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_beta_users_updated_at BEFORE UPDATE ON beta_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE beta_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres données
CREATE POLICY "Users can view own data" ON beta_users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own data" ON beta_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own data" ON beta_users
  FOR UPDATE USING (true);

-- Les téléchargements sont accessibles par l'utilisateur
CREATE POLICY "Users can view own downloads" ON downloads
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own downloads" ON downloads
  FOR INSERT WITH CHECK (true);

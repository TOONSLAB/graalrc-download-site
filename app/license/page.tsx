'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LicensePage() {
  const router = useRouter()
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAccept = async () => {
    if (!accepted) {
      setError('Vous devez accepter la licence pour continuer')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Ici on accepterait la licence via l'API
      // Pour l'instant on redirige directement
      router.push('/download')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center shadow-graal-lg mx-auto">
              <span className="text-4xl font-medieval font-bold text-graal-darker">G</span>
            </div>
          </Link>
          <h1 className="text-4xl font-medieval text-graal-primary mb-2">
            Accord de Licence
          </h1>
          <p className="text-gray-400">
            Veuillez lire et accepter les termes de la licence
          </p>
        </div>

        {/* Licence Content */}
        <div className="card-graal shadow-graal-lg mb-6">
          <div className="prose prose-invert max-w-none">
            <div className="h-96 overflow-y-auto px-4 py-6 bg-graal-darker/50 rounded-lg border border-graal-primary/20">
              <h2 className="text-2xl font-medieval text-graal-primary mb-4">
                CONTRAT DE LICENCE UTILISATEUR FINAL (EULA)
              </h2>
              
              <p className="text-gray-300 mb-4">
                <strong>Dernière mise à jour :</strong> 21 novembre 2025
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">1. ACCEPTATION DES TERMES</h3>
              <p className="text-gray-400 mb-4">
                En téléchargeant, installant ou utilisant Graal RC ("le Logiciel"), vous acceptez d'être lié par les termes de ce Contrat de Licence Utilisateur Final. Si vous n'acceptez pas ces termes, n'installez pas et n'utilisez pas le Logiciel.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">2. LICENCE</h3>
              <p className="text-gray-400 mb-4">
                Ce logiciel est fourni sous licence béta. Graal RC vous accorde une licence limitée, non exclusive, non transférable et révocable pour utiliser le Logiciel à des fins de test et d'évaluation uniquement.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">3. RESTRICTIONS</h3>
              <p className="text-gray-400 mb-4">
                Vous ne pouvez pas :
              </p>
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
                <li>Copier, modifier ou distribuer le Logiciel</li>
                <li>Effectuer de l'ingénierie inverse, décompiler ou désassembler le Logiciel</li>
                <li>Louer, prêter ou donner en licence le Logiciel à des tiers</li>
                <li>Utiliser le Logiciel à des fins commerciales sans autorisation</li>
                <li>Supprimer ou modifier les mentions de droits d'auteur</li>
              </ul>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">4. ACCÈS BÉTA</h3>
              <p className="text-gray-400 mb-4">
                Le Logiciel est actuellement en version béta. Il peut contenir des bugs, des erreurs et des fonctionnalités incomplètes. Vous reconnaissez que :
              </p>
              <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
                <li>Le Logiciel est fourni "EN L'ÉTAT" sans garantie d'aucune sorte</li>
                <li>Votre accès peut être révoqué à tout moment sans préavis</li>
                <li>Le Logiciel peut être modifié ou arrêté sans notification</li>
              </ul>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">5. CONFIDENTIALITÉ</h3>
              <p className="text-gray-400 mb-4">
                En tant que testeur béta, vous acceptez de ne pas divulguer d'informations confidentielles concernant le Logiciel, y compris mais sans s'y limiter, les fonctionnalités, les bugs découverts, et les performances.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">6. COLLECTE DE DONNÉES</h3>
              <p className="text-gray-400 mb-4">
                Le Logiciel peut collecter des données d'utilisation anonymes pour améliorer les fonctionnalités et corriger les bugs. Aucune donnée personnelle identifiable n'est collectée sans votre consentement explicite.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">7. PROPRIÉTÉ INTELLECTUELLE</h3>
              <p className="text-gray-400 mb-4">
                Tous les droits, titres et intérêts dans et sur le Logiciel restent la propriété exclusive de Graal RC. Cette licence ne vous confère aucun droit de propriété sur le Logiciel.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">8. LIMITATION DE RESPONSABILITÉ</h3>
              <p className="text-gray-400 mb-4">
                EN AUCUN CAS GRAAL RC NE SERA RESPONSABLE DE DOMMAGES DIRECTS, INDIRECTS, ACCESSOIRES, SPÉCIAUX OU CONSÉCUTIFS RÉSULTANT DE L'UTILISATION OU DE L'IMPOSSIBILITÉ D'UTILISER LE LOGICIEL.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">9. RÉSILIATION</h3>
              <p className="text-gray-400 mb-4">
                Cette licence est effective jusqu'à sa résiliation. Vos droits en vertu de cette licence prendront fin automatiquement si vous ne respectez pas l'une de ses conditions. Graal RC peut également résilier cette licence à tout moment sans préavis.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">10. MODIFICATIONS</h3>
              <p className="text-gray-400 mb-4">
                Graal RC se réserve le droit de modifier ces termes à tout moment. Les modifications entreront en vigueur dès leur publication.
              </p>

              <h3 className="text-xl font-medieval text-graal-primary mb-3">11. CONTACT</h3>
              <p className="text-gray-400 mb-4">
                Pour toute question concernant cette licence, veuillez nous contacter via notre site web.
              </p>

              <p className="text-gray-500 text-sm mt-8">
                © 2025 Graal RC. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptance Form */}
        <div className="card-graal shadow-graal-lg">
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-graal-primary/30 bg-graal-darker text-graal-primary focus:ring-graal-primary focus:ring-offset-0"
              />
              <span className="text-gray-300 flex-1">
                J'ai lu et j'accepte les termes et conditions de ce Contrat de Licence Utilisateur Final
              </span>
            </label>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                disabled={loading || !accepted}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Traitement...' : 'Accepter et Continuer'}
              </button>
              <Link href="/" className="btn-secondary flex-1 text-center">
                Refuser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

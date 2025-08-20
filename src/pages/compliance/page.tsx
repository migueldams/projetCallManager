
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

interface ComplianceItem {
  id: string;
  title: string;
  type: 'GDPR' | 'Sécurité' | 'Audit' | 'Politique';
  status: 'compliant' | 'warning' | 'critical';
  lastReview: string;
  nextReview: string;
  description: string;
  assignee: string;
}

const mockCompliance: ComplianceItem[] = [
  {
    id: '1',
    title: 'Accord de Traitement des Données RGPD',
    type: 'GDPR',
    status: 'compliant',
    lastReview: '2024-01-15',
    nextReview: '2024-04-15',
    description: 'Les accords de traitement des données avec tous les fournisseurs tiers sont à jour',
    assignee: 'Équipe Juridique'
  },
  {
    id: '2',
    title: 'Contrôles d\'Accès aux Données Employés',
    type: 'Sécurité',
    status: 'warning',
    lastReview: '2024-01-10',
    nextReview: '2024-02-10',
    description: 'Certains employés ont accès à des données au-delà de leurs exigences de rôle',
    assignee: 'Sécurité IT'
  },
  {
    id: '3',
    title: 'Formulaires de Consentement d\'Enregistrement d\'Appels',
    type: 'GDPR',
    status: 'critical',
    lastReview: '2024-01-05',
    nextReview: '2024-01-25',
    description: 'Formulaires de consentement manquants pour 15% des appels enregistrés en décembre',
    assignee: 'Agent de Conformité'
  },
  {
    id: '4',
    title: 'Audit de Sécurité Annuel',
    type: 'Audit',
    status: 'compliant',
    lastReview: '2023-12-20',
    nextReview: '2024-12-20',
    description: 'Audit de sécurité annuel terminé avec succès sans problèmes majeurs',
    assignee: 'Auditeur Externe'
  },
  {
    id: '5',
    title: 'Politique de Rétention des Données',
    type: 'Politique',
    status: 'warning',
    lastReview: '2023-11-30',
    nextReview: '2024-02-28',
    description: 'La politique de rétention des données nécessite une mise à jour pour s\'aligner sur les nouvelles réglementations',
    assignee: 'Juridique & IT'
  }
];

const statusColors = {
  compliant: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
};

const typeColors = {
  GDPR: 'bg-blue-100 text-blue-800',
  Sécurité: 'bg-red-100 text-red-800',
  Audit: 'bg-purple-100 text-purple-800',
  Politique: 'bg-green-100 text-green-800'
};

const statusLabels = {
  compliant: 'Conforme',
  warning: 'Attention',
  critical: 'Critique'
};

export default function CompliancePage() {
  const [compliance, setCompliance] = useState<ComplianceItem[]>(mockCompliance);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showConsentModal, setShowConsentModal] = useState(false);

  const filteredCompliance = compliance.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const stats = {
    totalItems: compliance.length,
    compliant: compliance.filter(item => item.status === 'compliant').length,
    warnings: compliance.filter(item => item.status === 'warning').length,
    critical: compliance.filter(item => item.status === 'critical').length
  };

  const types = ['all', ...new Set(compliance.map(item => item.type))];

  const transactions = [
    { id: 1, description: 'Demande d\'Accès aux Données', count: 3, icon: 'ri-eye-line' },
    { id: 2, description: 'Demande de Suppression des Données', count: 1, icon: 'ri-error-warning-line' },
    { id: 3, description: 'Demande de Portabilité des Données', count: 0, icon: 'ri-download-line' },
    { id: 4, description: 'Retraits de Consentement', count: 2, icon: 'ri-lock-line' }
  ];

  const securityMeasures = [
    { measure: 'Chiffrement des Données', status: 'Actif', color: 'green' },
    { measure: 'Journalisation des Accès', status: 'Actif', color: 'green' },
    { measure: 'Sauvegardes Régulières', status: 'Actif', color: 'green' },
    { measure: 'Plan de Réponse aux Incidents', status: 'Nécessite Mise à Jour', color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RGPD & Conformité</h1>
          <p className="text-gray-600 dark:text-gray-400">Surveillez le statut de conformité et la protection des données</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowConsentModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-shield-line w-4 h-4 mr-2"></i>
            Politique de Confidentialité
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line w-4 h-4 mr-2"></i>
            Rapport de Conformité
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Éléments', value: stats.totalItems, color: 'blue', icon: 'ri-file-text-line' },
          { label: 'Conformes', value: stats.compliant, color: 'green', icon: 'ri-checkbox-circle-line' },
          { label: 'Avertissements', value: stats.warnings, color: 'yellow', icon: 'ri-error-warning-line' },
          { label: 'Critiques', value: stats.critical, color: 'red', icon: 'ri-error-warning-line' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 w-12 h-12 flex items-center justify-center`}>
                <i className={`${stat.icon} text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Filtrer les Éléments de Conformité</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'Tous les Types' : type}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
            >
              <option value="all">Tous les Statuts</option>
              <option value="compliant">Conforme</option>
              <option value="warning">Avertissement</option>
              <option value="critical">Critique</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statut de Conformité</h2>
          
          <div className="space-y-4">
            {filteredCompliance.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[item.type]}`}>
                        {item.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        Dernière Révision: {new Date(item.lastReview).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        Prochaine Révision: {new Date(item.nextReview).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        {item.assignee}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-colors cursor-pointer"
                      title="Voir Détails"
                    >
                      <i className="ri-eye-line"></i>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-2xl transition-colors cursor-pointer"
                      title="Télécharger Rapport"
                    >
                      <i className="ri-download-line"></i>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* GDPR Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Subject Rights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Droits des Personnes Concernées</h3>
          <div className="space-y-3">
            {transactions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <i className={`${item.icon} text-gray-600 dark:text-gray-400`}></i>
                  <span className="text-gray-900 dark:text-white">{item.description}</span>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full text-sm font-medium">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Measures */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mesures de Sécurité</h3>
          <div className="space-y-3">
            {securityMeasures.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <i className="ri-shield-line text-gray-600 dark:text-gray-400"></i>
                  <span className="text-gray-900 dark:text-white">{item.measure}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  item.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowConsentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Politique de Confidentialité & Consentement des Données</h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>Chez Pulse Manager, nous nous engageons à protéger votre vie privée et à assurer la conformité avec les réglementations RGPD.</p>
              
              <h3 className="font-semibold text-gray-900 dark:text-white">Collecte de Données</h3>
              <p>Nous collectons et traitons les données personnelles nécessaires aux opérations de call center, incluant :</p>
              <ul className="list-disc list-inside ml-4">
                <li>Informations des employés pour les RH et la paie</li>
                <li>Enregistrements d'appels pour l'assurance qualité et la formation</li>
                <li>Métriques de performance pour les rapports de gestion</li>
                <li>Journaux d'utilisation du système pour la sécurité et l'optimisation</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 dark:text-white">Vos Droits</h3>
              <p>Sous le RGPD, vous avez le droit de :</p>
              <ul className="list-disc list-inside ml-4">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger les données inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Portabilité des données</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 dark:text-white">Sécurité des Données</h3>
              <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité des données, incluant le chiffrement, les contrôles d'accès et les audits de sécurité réguliers.</p>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConsentModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
              >
                Fermer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl cursor-pointer"
              >
                J'ai Compris
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* AI Compliance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🤖 Assistant IA - Insights Conformité</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Évaluation des Risques</p>
                <p className="text-gray-600 dark:text-gray-400">Le manque de consentement pour l'enregistrement d'appels pose un risque moyen - recommande une attention immédiate</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Opportunités d'Automatisation</p>
                <p className="text-gray-600 dark:text-gray-400">Implémentez le suivi automatisé du consentement pour l'intégration de nouveaux clients</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Mises à Jour Réglementaires</p>
                <p className="text-gray-600 dark:text-gray-400">Nouvelles directives de rétention des données effectives en mars 2024 - mettez à jour les politiques en conséquence</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

export default function RecruitmentPage() {
  const { candidates } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalCandidates: candidates.length,
    pendingReview: candidates.filter(c => c.status === 'applied').length,
    interviews: candidates.filter(c => c.status === 'interview').length,
    hired: candidates.filter(c => c.status === 'hired').length
  };

  const statusColors = {
    applied: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    screening: 'bg-blue-100 text-blue-800 border-blue-200',
    interview: 'bg-purple-100 text-purple-800 border-purple-200',
    hired: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusLabels = {
    applied: 'Candidature',
    screening: 'Présélection',
    interview: 'Entretien',
    hired: 'Embauché',
    rejected: 'Rejeté'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recrutement</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les candidats et le processus d'embauche</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewJobModal(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-user-add-line w-4 h-4 mr-2"></i>
          Publier Offre
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Candidats', value: stats.totalCandidates, color: 'blue', icon: 'ri-user-line' },
          { label: 'En Attente', value: stats.pendingReview, color: 'yellow', icon: 'ri-time-line' },
          { label: 'Entretiens', value: stats.interviews, color: 'indigo', icon: 'ri-calendar-line' },
          { label: 'Embauchés', value: stats.hired, color: 'green', icon: 'ri-star-line' }
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
          {/* Search */}
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Rechercher des candidats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <i className="ri-filter-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Tous Statuts</option>
              <option value="applied">Candidatures</option>
              <option value="screening">Présélection</option>
              <option value="interview">Entretiens</option>
              <option value="hired">Embauchés</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Candidats</h2>
          
          <div className="space-y-4">
            {filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {candidate.firstName[0]}{candidate.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[candidate.status]}`}>
                          {statusLabels[candidate.status]}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{candidate.position}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>{candidate.email}</span>
                        <span>{candidate.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <i className="ri-briefcase-line mr-1"></i>
                          {candidate.experience} ans d'expérience
                        </div>
                        <div className="flex items-center">
                          <i className="ri-calendar-line mr-1"></i>
                          Postulé le {new Date(candidate.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <i className="ri-money-euro-circle-line mr-1"></i>
                          €{candidate.salary?.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-2xl transition-colors cursor-pointer"
                      title="Voir Détails"
                    >
                      <i className="ri-eye-line"></i>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-2xl transition-colors cursor-pointer"
                      title="Télécharger CV"
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

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🤖 Assistant IA - Insights Recrutement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Meilleurs Candidats</p>
                <p className="text-gray-600 dark:text-gray-400">Sarah Johnson montre un excellent potentiel de leadership pour les postes de supervision</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Lacunes Compétences</p>
                <p className="text-gray-600 dark:text-gray-400">Considérez les candidats avec expertise support technique et CRM</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Planification Entretiens</p>
                <p className="text-gray-600 dark:text-gray-400">Créneaux optimaux pour entretiens : Mardi-Jeudi, 10h-15h</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

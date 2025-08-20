
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeavesList from './components/LeavesList';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveStats from './components/LeaveStats';

export default function LeavesPage() {
  const { user } = useAuthStore();
  const { leaveRequests } = useAppStore();
  const [activeTab, setActiveTab] = useState('requests');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const tabs = [
    { id: 'requests', label: 'Mes demandes', icon: 'ri-file-list-line' },
    { id: 'calendar', label: 'Calendrier', icon: 'ri-calendar-line' },
    { id: 'stats', label: 'Solde & Stats', icon: 'ri-bar-chart-line' },
  ];

  // Filter requests based on user role
  const filteredRequests = user?.role === 'agent' 
    ? leaveRequests.filter(req => req.userId === user.id)
    : leaveRequests;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Congés & Permissions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez vos demandes de congés et absences
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold text-primary-600">25</p>
                <p className="text-xs text-gray-500">Jours restants</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold text-green-600">3</p>
                <p className="text-xs text-gray-500">Approuvées</p>
              </div>
            </div>
          </div>

          {/* New Request Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>Nouvelle demande</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2"
      >
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className={tab.icon}></i>
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'requests' && <LeavesList requests={filteredRequests} />}
          {activeTab === 'calendar' && <LeaveCalendar requests={filteredRequests} />}
          {activeTab === 'stats' && <LeaveStats userId={user?.id} />}
        </motion.div>
      </AnimatePresence>

      {/* AI Assistant Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
              Assistant IA - Conseils Congés
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-1">
                  Période Optimale
                </h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Semaine du 15-19 juillet recommandée (faible charge équipe)
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-1">
                  Solde Optimal
                </h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Prenez 5 jours avant fin juin pour éviter la perte
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-1">
                  Planification
                </h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  3 collègues absents la semaine du 22 juillet
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Leave Request Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <LeaveRequestForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

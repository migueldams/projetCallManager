
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';

const quickActions = {
  admin: [
    { icon: 'ri-phone-add-line', label: 'Nouvel appel', color: 'blue', path: '/calls/new' },
    { icon: 'ri-team-line', label: 'Gérer équipe', color: 'green', path: '/users' },
    { icon: 'ri-bar-chart-box-line', label: 'Rapports', color: 'purple', path: '/reports' },
    { icon: 'ri-settings-line', label: 'Paramètres', color: 'gray', path: '/settings' },
  ],
  agent: [
    { icon: 'ri-phone-line', label: 'Démarrer appel', color: 'blue', path: '/calls/new' },
    { icon: 'ri-time-line', label: 'Pointer', color: 'green', path: '/timetracking' },
    { icon: 'ri-sticky-note-line', label: 'Mes notes', color: 'yellow', path: '/notes' },
    { icon: 'ri-calendar-line', label: 'Congés', color: 'purple', path: '/leaves' },
  ],
  rh: [
    { icon: 'ri-user-add-line', label: 'Nouveau RDV', color: 'blue', path: '/recruitment' },
    { icon: 'ri-calendar-check-line', label: 'Valider congés', color: 'green', path: '/leaves' },
    { icon: 'ri-team-line', label: 'Présences', color: 'purple', path: '/timetracking' },
    { icon: 'ri-file-list-line', label: 'Rapports RH', color: 'orange', path: '/reports' },
  ],
};

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
  orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  gray: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
};

export default function QuickActions() {
  const { user } = useAuthStore();
  const actions = quickActions[user?.role as keyof typeof quickActions] || quickActions.agent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
          <i className="ri-flashlight-line text-white"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Actions rapides
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Raccourcis fréquents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.path}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]} text-white rounded-2xl shadow-md transition-all cursor-pointer whitespace-nowrap`}
          >
            <div className="flex flex-col items-center space-y-2">
              <i className={`${action.icon} text-2xl`}></i>
              <span className="text-sm font-medium text-center">
                {action.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
      >
        <div className="flex items-center space-x-2">
          <i className="ri-lightbulb-line text-primary-600 dark:text-primary-400"></i>
          <p className="text-sm text-primary-700 dark:text-primary-300">
            <strong>Astuce :</strong> Utilisez Cmd+K pour la recherche rapide !
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

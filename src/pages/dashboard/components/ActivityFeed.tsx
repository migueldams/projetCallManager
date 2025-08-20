
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const activities = [
  {
    id: '1',
    type: 'call',
    user: 'Sophie Leroy',
    action: 'a terminé un appel',
    details: 'Vente Premium - Jean Dupont',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    icon: 'ri-phone-line',
    color: 'green',
  },
  {
    id: '2',
    type: 'leave',
    user: 'Marc Petit',
    action: 'a demandé un congé',
    details: '23-25 Janvier 2024',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    icon: 'ri-calendar-line',
    color: 'blue',
  },
  {
    id: '3',
    type: 'stock',
    user: 'Système',
    action: 'alerte stock faible',
    details: 'Licences CRM - 5 restantes',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    icon: 'ri-alert-line',
    color: 'red',
  },
  {
    id: '4',
    type: 'achievement',
    user: 'Lisa Martin',
    action: 'a atteint son objectif',
    details: '150% des ventes mensuelles',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    icon: 'ri-trophy-line',
    color: 'yellow',
  },
  {
    id: '5',
    type: 'checkin',
    user: 'Paul Durand',
    action: 's\'est connecté',
    details: 'Arrivée bureau',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: 'ri-time-line',
    color: 'gray',
  },
];

const colorClasses = {
  green: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  blue: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  red: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
  yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  gray: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
  purple: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
};

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
            <i className="ri-pulse-line text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activité en temps réel
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dernières actions
            </p>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
            En direct
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {/* Activity Icon */}
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
              <i className={`${activity.icon} text-sm`}></i>
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-gray-600 dark:text-gray-400"> {activity.action}</span>
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {formatDistanceToNow(activity.timestamp, { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </span>
              </div>
              {activity.details && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {activity.details}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl transition-colors font-medium text-sm cursor-pointer whitespace-nowrap"
      >
        <div className="flex items-center justify-center space-x-2">
          <i className="ri-history-line"></i>
          <span>Voir toute l'activité</span>
        </div>
      </motion.button>
    </motion.div>
  );
}

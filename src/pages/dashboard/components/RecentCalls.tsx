
import { motion } from 'framer-motion';
import type { Call } from '../../../types';

interface RecentCallsProps {
  calls: Call[];
}

const statusIcons = {
  termine: 'ri-checkbox-circle-line',
  en_cours: 'ri-phone-line',
  annule: 'ri-close-circle-line',
  rappel: 'ri-arrow-go-back-line',
};

const statusColors = {
  termine: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  en_cours: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  annule: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
  rappel: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
};

export default function RecentCalls({ calls }: RecentCallsProps) {
  const recentCalls = calls.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <i className="ri-phone-line text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appels récents
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Activité de la journée
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium text-sm cursor-pointer"
        >
          Voir tout
        </motion.button>
      </div>

      <div className="space-y-4">
        {recentCalls.map((call, index) => (
          <motion.div
            key={call.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            {/* Call Status Icon */}
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${statusColors[call.status]}`}>
              <i className={`${statusIcons[call.status]} text-lg`}></i>
            </div>

            {/* Call Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {call.customerName}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(call.startTime).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {call.campaign}
                </p>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {call.duration}min
                </span>
              </div>
              {call.outcome && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                  {call.outcome}
                </p>
              )}
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
            >
              <i className="ri-more-line"></i>
            </motion.button>
          </motion.div>
        ))}

        {recentCalls.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <i className="ri-phone-line text-4xl mb-3"></i>
            <p>Aucun appel récent</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

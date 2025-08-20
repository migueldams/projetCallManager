
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';

const statsConfig = {
  admin: [
    {
      title: 'Appels aujourd\'hui',
      value: '247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: 'ri-phone-line',
      color: 'blue',
    },
    {
      title: 'Agents actifs',
      value: '18/22',
      change: '82%',
      changeType: 'neutral' as const,
      icon: 'ri-team-line',
      color: 'green',
    },
    {
      title: 'Taux conversion',
      value: '23.8%',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: 'ri-arrow-up-line',
      color: 'purple',
    },
    {
      title: 'CA journalier',
      value: '€12,450',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: 'ri-money-euro-circle-line',
      color: 'orange',
    },
  ],
  agent: [
    {
      title: 'Mes appels',
      value: '23',
      change: '+3',
      changeType: 'positive' as const,
      icon: 'ri-phone-line',
      color: 'blue',
    },
    {
      title: 'Temps moyen',
      value: '4m 32s',
      change: '-18s',
      changeType: 'positive' as const,
      icon: 'ri-time-line',
      color: 'green',
    },
    {
      title: 'Conversions',
      value: '7',
      change: '+2',
      changeType: 'positive' as const,
      icon: 'ri-checkbox-circle-line',
      color: 'purple',
    },
    {
      title: 'Performance',
      value: '94%',
      change: '+6%',
      changeType: 'positive' as const,
      icon: 'ri-star-line',
      color: 'orange',
    },
  ],
  rh: [
    {
      title: 'Équipe présente',
      value: '18/22',
      change: '82%',
      changeType: 'neutral' as const,
      icon: 'ri-team-line',
      color: 'blue',
    },
    {
      title: 'Retards',
      value: '2',
      change: '-1',
      changeType: 'positive' as const,
      icon: 'ri-alarm-warning-line',
      color: 'red',
    },
    {
      title: 'Demandes congés',
      value: '5',
      change: '+2',
      changeType: 'neutral' as const,
      icon: 'ri-calendar-line',
      color: 'green',
    },
    {
      title: 'Recrutements',
      value: '3',
      change: 'En cours',
      changeType: 'neutral' as const,
      icon: 'ri-user-add-line',
      color: 'purple',
    },
  ],
};

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

export default function DashboardStats() {
  const { user } = useAuthStore();
  const stats = statsConfig[user?.role as keyof typeof statsConfig] || statsConfig.agent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center`}>
              <i className={`${stat.icon} text-white text-xl`}></i>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat.changeType === 'positive' ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' :
              stat.changeType === 'neutral' ? 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30' :
              'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-700'
            }`}>
              {stat.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </div>

          {/* Micro animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
            className={`mt-4 h-1 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-full origin-left`}
          />
        </motion.div>
      ))}
    </div>
  );
}


import { motion } from 'framer-motion';

interface KPICardsProps {
  period: string;
  agentId: string;
}

const kpiData = {
  totalCalls: { value: 1247, change: 12.5, icon: 'ri-phone-line' },
  successRate: { value: 68.2, change: 5.3, icon: 'ri-check-line' },
  avgDuration: { value: 8.5, change: -12.1, icon: 'ri-time-line' },
  satisfaction: { value: 4.3, change: 8.7, icon: 'ri-star-line' },
  revenue: { value: 45680, change: 15.2, icon: 'ri-money-dollar-circle-line' },
  conversions: { value: 156, change: 22.4, icon: 'ri-trophy-line' },
};

export default function KPICards({ period, agentId }: KPICardsProps) {
  const kpis = [
    {
      title: 'Total Appels',
      value: kpiData.totalCalls.value.toLocaleString(),
      change: kpiData.totalCalls.change,
      icon: kpiData.totalCalls.icon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    {
      title: 'Taux de Réussite',
      value: `${kpiData.successRate.value}%`,
      change: kpiData.successRate.change,
      icon: kpiData.successRate.icon,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    },
    {
      title: 'Durée Moyenne',
      value: `${kpiData.avgDuration.value}min`,
      change: kpiData.avgDuration.change,
      icon: kpiData.avgDuration.icon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    },
    {
      title: 'Satisfaction',
      value: `${kpiData.satisfaction.value}/5`,
      change: kpiData.satisfaction.change,
      icon: kpiData.satisfaction.icon,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
    },
    {
      title: 'Chiffre d\'Affaires',
      value: `${(kpiData.revenue.value / 1000).toFixed(0)}k€`,
      change: kpiData.revenue.change,
      icon: kpiData.revenue.icon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    },
    {
      title: 'Conversions',
      value: kpiData.conversions.value.toString(),
      change: kpiData.conversions.change,
      icon: kpiData.conversions.icon,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${kpi.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-2xl flex items-center justify-center`}>
              <i className={`${kpi.icon} text-white text-xl`}></i>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              kpi.change > 0 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              <i className={kpi.change > 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}></i>
              <span>{Math.abs(kpi.change)}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {kpi.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {kpi.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

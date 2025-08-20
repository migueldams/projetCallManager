
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState } from 'react';

const performanceData = [
  { day: 'Lun', calls: 45, conversions: 12, satisfaction: 4.2 },
  { day: 'Mar', calls: 52, conversions: 15, satisfaction: 4.5 },
  { day: 'Mer', calls: 48, conversions: 13, satisfaction: 4.1 },
  { day: 'Jeu', calls: 61, conversions: 18, satisfaction: 4.7 },
  { day: 'Ven', calls: 55, conversions: 16, satisfaction: 4.4 },
  { day: 'Sam', calls: 38, conversions: 10, satisfaction: 4.3 },
  { day: 'Dim', calls: 42, conversions: 11, satisfaction: 4.6 },
];

export default function PerformanceChart() {
  const [activeMetric, setActiveMetric] = useState<'calls' | 'conversions' | 'satisfaction'>('calls');

  const metrics = {
    calls: {
      label: 'Appels',
      color: '#3B82F6',
      icon: 'ri-phone-line',
    },
    conversions: {
      label: 'Conversions',
      color: '#10B981',
      icon: 'ri-checkbox-circle-line',
    },
    satisfaction: {
      label: 'Satisfaction',
      color: '#F59E0B',
      icon: 'ri-star-line',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <i className="ri-bar-chart-line text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance cette semaine
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Évolution des métriques clés
            </p>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
          {Object.entries(metrics).map(([key, metric]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMetric(key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeMetric === key
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <i className={metric.icon}></i>
                <span>{metric.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metrics[activeMetric].color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={metrics[activeMetric].color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={metrics[activeMetric].color}
              strokeWidth={3}
              fill={`url(#gradient-${activeMetric})`}
              dot={{ fill: metrics[activeMetric].color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: metrics[activeMetric].color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        {Object.entries(metrics).map(([key, metric]) => {
          const totalValue = performanceData.reduce((sum, day) => sum + day[key as keyof typeof day], 0);
          const avgValue = key === 'satisfaction' 
            ? (totalValue / performanceData.length).toFixed(1) 
            : totalValue.toString();
          
          return (
            <div key={key} className="text-center">
              <div className={`w-8 h-8 rounded-2xl flex items-center justify-center mx-auto mb-2`} style={{ backgroundColor: `${metric.color}20` }}>
                <i className={`${metric.icon} text-sm`} style={{ color: metric.color }}></i>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {avgValue}{key === 'satisfaction' ? '/5' : ''}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {key === 'satisfaction' ? 'Moyenne' : 'Total'} {metric.label.toLowerCase()}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}


import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { useState } from 'react';

interface PerformanceChartProps {
  period: string;
  agentId: string;
}

const mockData = {
  week: [
    { name: 'Lun', calls: 24, sales: 8, satisfaction: 4.2 },
    { name: 'Mar', calls: 28, sales: 12, satisfaction: 4.1 },
    { name: 'Mer', calls: 32, sales: 15, satisfaction: 4.3 },
    { name: 'Jeu', calls: 26, sales: 9, satisfaction: 4.0 },
    { name: 'Ven', calls: 35, sales: 18, satisfaction: 4.5 },
    { name: 'Sam', calls: 22, sales: 7, satisfaction: 4.2 },
    { name: 'Dim', calls: 18, sales: 5, satisfaction: 4.1 },
  ],
  month: [
    { name: 'Sem 1', calls: 180, sales: 65, satisfaction: 4.1 },
    { name: 'Sem 2', calls: 195, sales: 78, satisfaction: 4.2 },
    { name: 'Sem 3', calls: 210, sales: 85, satisfaction: 4.3 },
    { name: 'Sem 4', calls: 225, sales: 92, satisfaction: 4.4 },
  ],
};

export default function PerformanceChart({ period, agentId }: PerformanceChartProps) {
  const [chartType, setChartType] = useState('calls');
  
  const data = mockData[period as keyof typeof mockData] || mockData.month;

  const chartTypes = [
    { value: 'calls', label: 'Appels', icon: 'ri-phone-line', color: '#3B82F6' },
    { value: 'sales', label: 'Ventes', icon: 'ri-money-dollar-circle-line', color: '#10B981' },
    { value: 'satisfaction', label: 'Satisfaction', icon: 'ri-star-line', color: '#F59E0B' },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'calls':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#3B82F6"
                fill="url(#callsGradient)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'sales':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#10B981" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'satisfaction':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[3.5, 5]}
                className="text-xs"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2, fill: '#FFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution des performances
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Analyse détaillée par période
            </p>
          </div>

          {/* Chart Type Switcher */}
          <div className="flex items-center space-x-2">
            {chartTypes.map((type) => (
              <motion.button
                key={type.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChartType(type.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
                  chartType === type.value
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <i className={type.icon} style={{ color: chartType === type.value ? type.color : undefined }}></i>
                <span className="text-sm font-medium">{type.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        {renderChart()}
      </div>
    </motion.div>
  );
}

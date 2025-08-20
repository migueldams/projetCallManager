
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface LeaveStatsProps {
  userId?: string;
}

const leaveTypeData = [
  { name: 'Congés payés', value: 15, color: '#3B82F6' },
  { name: 'Congé maladie', value: 3, color: '#EF4444' },
  { name: 'Formation', value: 5, color: '#10B981' },
  { name: 'Personnel', value: 2, color: '#F59E0B' },
];

const monthlyData = [
  { month: 'Jan', taken: 2, available: 25 },
  { month: 'Fév', taken: 0, available: 25 },
  { month: 'Mar', taken: 3, available: 22 },
  { month: 'Avr', taken: 1, available: 21 },
  { month: 'Mai', taken: 5, available: 16 },
  { month: 'Jun', taken: 2, available: 14 },
];

export default function LeaveStats({ userId }: LeaveStatsProps) {
  const totalTaken = leaveTypeData.reduce((sum, item) => sum + item.value, 0);
  const totalAvailable = 30;
  const remaining = totalAvailable - totalTaken;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <i className="ri-calendar-check-line text-white text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jours pris</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTaken}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <i className="ri-calendar-line text-white text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jours restants</p>
              <p className="text-2xl font-bold text-green-600">{remaining}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <i className="ri-award-line text-white text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total annuel</p>
              <p className="text-2xl font-bold text-purple-600">{totalAvailable}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Types Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Répartition par type
          </h3>
          
          <div className="flex items-center">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {leaveTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 ml-6">
              <div className="space-y-3">
                {leaveTypeData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.value} jour{item.value > 1 ? 's' : ''}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Monthly Evolution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Évolution mensuelle
          </h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
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
                dataKey="taken" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Jours pris"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Balance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Solde de congés 2024
            </h4>
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Acquis cette année</p>
                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  {totalAvailable} jours
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Consommés</p>
                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  {totalTaken} jours
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Disponibles</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {remaining} jours
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(totalTaken / totalAvailable) * 100}, 100`}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
                  {Math.round((totalTaken / totalAvailable) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-blue-700 dark:text-blue-300 mb-2">
            <span>Utilisation</span>
            <span>{totalTaken}/{totalAvailable} jours</span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalTaken / totalAvailable) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

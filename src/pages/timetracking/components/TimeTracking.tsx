import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../../store/appStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeTrackingProps {
  userId?: string;
}

export default function TimeTracking({ userId }: TimeTrackingProps) {
  const { timeEntries } = useAppStore();
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    totalHours: 0,
    averageDaily: 0,
    daysWorked: 0,
    overtime: 0
  });

  useEffect(() => {
    // Generate mock weekly data
    const mockWeeklyData = [
      { day: 'Lun', hours: 8.5, target: 8 },
      { day: 'Mar', hours: 7.5, target: 8 },
      { day: 'Mer', hours: 8.2, target: 8 },
      { day: 'Jeu', hours: 9.1, target: 8 },
      { day: 'Ven', hours: 7.8, target: 8 },
      { day: 'Sam', hours: 0, target: 0 },
      { day: 'Dim', hours: 0, target: 0 }
    ];
    
    setWeeklyData(mockWeeklyData);
    
    // Calculate monthly stats
    const totalHours = mockWeeklyData.reduce((sum, day) => sum + day.hours, 0);
    const daysWorked = mockWeeklyData.filter(day => day.hours > 0).length;
    
    setMonthlyStats({
      totalHours,
      averageDaily: daysWorked > 0 ? totalHours / daysWorked : 0,
      daysWorked,
      overtime: Math.max(0, totalHours - (daysWorked * 8))
    });
  }, [userId, timeEntries]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Suivi hebdomadaire
          </h3>
          <div className="flex items-center space-x-2">
            <i className="ri-time-line text-primary-500"></i>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Semaine du 15/01
            </span>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(31 41 55)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="hours" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Heures travaillées"
              />
              <Bar 
                dataKey="target" 
                fill="#E5E7EB" 
                radius={[4, 4, 0, 0]}
                name="Objectif"
                opacity={0.3}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-time-line text-blue-500 text-xl"></i>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                TOTAL
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {monthlyStats.totalHours.toFixed(1)}h
            </div>
            <div className="text-xs text-blue-500 dark:text-blue-300">
              Cette semaine
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-calendar-check-line text-green-500 text-xl"></i>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                MOYENNE
              </span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {monthlyStats.averageDaily.toFixed(1)}h
            </div>
            <div className="text-xs text-green-500 dark:text-green-300">
              Par jour travaillé
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-calendar-2-line text-purple-500 text-xl"></i>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                JOURS
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {monthlyStats.daysWorked}
            </div>
            <div className="text-xs text-purple-500 dark:text-purple-300">
              Travaillés
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-timer-line text-orange-500 text-xl"></i>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                HEURES SUP
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {monthlyStats.overtime.toFixed(1)}h
            </div>
            <div className="text-xs text-orange-500 dark:text-orange-300">
              Cette semaine
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions rapides
            </span>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-xs bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-line mr-1"></i>
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-calendar-line mr-1"></i>
                Historique
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
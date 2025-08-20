
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import PerformanceChart from './components/PerformanceChart';
import KPICards from './components/KPICards';
import TeamRanking from './components/TeamRanking';
import ObjectivesPanel from './components/ObjectivesPanel';

export default function PerformancePage() {
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedAgent, setSelectedAgent] = useState(user?.role === 'agent' ? user.id : 'all');

  const periods = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' },
  ];

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
            Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivez et analysez les performances de votre équipe
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Period Selector */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-line"></i>
            <span>Exporter</span>
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <KPICards period={selectedPeriod} agentId={selectedAgent} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart period={selectedPeriod} agentId={selectedAgent} />
        </div>

        {/* Team Ranking */}
        <div>
          <TeamRanking period={selectedPeriod} />
        </div>
      </div>

      {/* Objectives Panel */}
      <ObjectivesPanel agentId={selectedAgent} />

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
              Insights IA - Analyse de Performance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-2xl">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Tendances Positives
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Taux de conversion +12% vs mois dernier</li>
                  <li>• Durée moyenne d'appel optimisée (-2min)</li>
                  <li>• Satisfaction client en hausse (4.2/5)</li>
                </ul>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-2xl">
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Recommandations
                </h5>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Former équipe sur objections clients</li>
                  <li>• Récompenser top performers ce mois</li>
                  <li>• Ajuster horaires pour pic d'activité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

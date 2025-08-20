
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ObjectivesPanelProps {
  agentId: string;
}

const objectives = [
  {
    id: '1',
    title: 'Appels quotidiens',
    target: 50,
    current: 42,
    period: 'Aujourd\'hui',
    color: 'from-blue-500 to-blue-600',
    icon: 'ri-phone-line',
  },
  {
    id: '2',
    title: 'Taux de conversion',
    target: 15,
    current: 18,
    period: 'Ce mois',
    color: 'from-green-500 to-green-600',
    icon: 'ri-target-line',
  },
  {
    id: '3',
    title: 'Chiffre d\'affaires',
    target: 12000,
    current: 8750,
    period: 'Ce mois',
    color: 'from-purple-500 to-purple-600',
    icon: 'ri-money-dollar-circle-line',
  },
  {
    id: '4',
    title: 'Satisfaction client',
    target: 4.5,
    current: 4.3,
    period: 'Ce mois',
    color: 'from-yellow-500 to-yellow-600',
    icon: 'ri-star-line',
  },
];

export default function ObjectivesPanel({ agentId }: ObjectivesPanelProps) {
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatValue = (value: number, objectiveId: string) => {
    switch (objectiveId) {
      case '3': return `${value.toLocaleString()}€`;
      case '4': return `${value.toFixed(1)}/5`;
      case '2': return `${value}%`;
      default: return value.toString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <i className="ri-flag-line text-white"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Objectifs & Progression
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Suivez l'atteinte de vos objectifs
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium cursor-pointer"
          >
            Modifier objectifs
          </motion.button>
        </div>
      </div>

      {/* Objectives Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((objective, index) => {
            const progress = getProgressPercentage(objective.current, objective.target);
            const isOverTarget = objective.current > objective.target;
            
            return (
              <motion.div
                key={objective.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedObjective(selectedObjective === objective.id ? null : objective.id)}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${objective.color} rounded-2xl flex items-center justify-center`}>
                      <i className={`${objective.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {objective.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {objective.period}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isOverTarget
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : progress >= 80
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {Math.round(progress)}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatValue(objective.current, objective.id)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      / {formatValue(objective.target, objective.id)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`bg-gradient-to-r ${objective.color} h-2 rounded-full`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedObjective === objective.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Restant: {formatValue(Math.max(0, objective.target - objective.current), objective.id)}</span>
                      <span>{isOverTarget ? 'Objectif dépassé!' : 'En cours'}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Overall Progress Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Progression Globale
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                3 objectifs sur 4 en bonne voie
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                87%
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <i className="ri-arrow-up-line mr-1"></i>
                +12% vs mois dernier
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

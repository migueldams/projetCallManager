
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Call } from '../../../types';

interface CallsTableProps {
  calls: Call[];
  onCallSelect: (callId: string) => void;
}

const statusIcons = {
  termine: { icon: 'ri-checkbox-circle-line', color: 'text-green-600' },
  en_cours: { icon: 'ri-phone-line', color: 'text-blue-600' },
  annule: { icon: 'ri-close-circle-line', color: 'text-red-600' },
  rappel: { icon: 'ri-arrow-go-back-line', color: 'text-orange-600' },
};

const statusLabels = {
  termine: 'Terminé',
  en_cours: 'En cours',
  annule: 'Annulé',
  rappel: 'À rappeler',
};

export default function CallsTable({ calls, onCallSelect }: CallsTableProps) {
  const [sortField, setSortField] = useState<keyof Call>('startTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedCalls = [...calls].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const handleSort = (field: keyof Call) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Liste des appels
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {calls.length} appel{calls.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleSort('customerName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Client</span>
                  <i className={`ri-arrow-up-down-line text-xs ${sortField === 'customerName' ? 'text-primary-600' : ''}`}></i>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleSort('campaign')}
              >
                <div className="flex items-center space-x-1">
                  <span>Campagne</span>
                  <i className={`ri-arrow-up-down-line text-xs ${sortField === 'campaign' ? 'text-primary-600' : ''}`}></i>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleSort('startTime')}
              >
                <div className="flex items-center space-x-1">
                  <span>Heure</span>
                  <i className={`ri-arrow-up-down-line text-xs ${sortField === 'startTime' ? 'text-primary-600' : ''}`}></i>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center space-x-1">
                  <span>Durée</span>
                  <i className={`ri-arrow-up-down-line text-xs ${sortField === 'duration' ? 'text-primary-600' : ''}`}></i>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Résultat
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedCalls.map((call, index) => (
              <motion.tr
                key={call.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => onCallSelect(call.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {call.customerName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {call.customerPhone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                    {call.campaign}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(call.startTime).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {call.duration}min
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <i className={`${statusIcons[call.status].icon} ${statusIcons[call.status].color}`}></i>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {statusLabels[call.status]}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="max-w-32 truncate">
                    {call.outcome}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {call.recording && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        title="Écouter l'enregistrement"
                      >
                        <i className="ri-play-circle-line text-lg"></i>
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
                      title="Plus d'options"
                    >
                      <i className="ri-more-line text-lg"></i>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {calls.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-phone-line text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">Aucun appel trouvé</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

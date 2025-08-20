
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import CallsTable from './components/CallsTable';
import CallFilters from './components/CallFilters';
import CallModal from './components/CallModal';
import NewCallModal from './components/NewCallModal';

export default function CallsPage() {
  const { calls } = useAppStore();
  const { user } = useAuthStore();
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isNewCallOpen, setIsNewCallOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    campaign: 'all',
    agent: 'all',
    dateRange: 'today',
  });

  // Filter calls based on user role and filters
  const filteredCalls = calls.filter(call => {
    // Role-based filtering
    if (user?.role === 'agent' && call.agentId !== user.id) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && call.status !== filters.status) {
      return false;
    }

    // Campaign filter
    if (filters.campaign !== 'all' && call.campaign !== filters.campaign) {
      return false;
    }

    return true;
  });

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
            {user?.role === 'agent' ? 'Mes appels' : 'Gestion des appels'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez et suivez l'activité des appels
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Stats Cards */}
          <div className="flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">{filteredCalls.length}</p>
                <p className="text-xs text-gray-500">Appels</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {filteredCalls.filter(c => c.status === 'termine').length}
                </p>
                <p className="text-xs text-gray-500">Terminés</p>
              </div>
            </div>
          </div>

          {/* New Call Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNewCallOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-phone-add-line"></i>
            <span>Nouvel appel</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <CallFilters filters={filters} onFiltersChange={setFilters} />

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-sm"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Assistant IA - Suggestions d'aujourd'hui
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              • 3 clients ont un potentiel élevé de conversion basé sur leurs interactions précédentes
              <br />
              • Le meilleur créneau pour les appels est 14h-16h (taux de réponse +23%)
              <br />
              • Campagne "Vente Premium" performe mieux que prévu (+15% vs objectif)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Calls Table */}
      <CallsTable 
        calls={filteredCalls}
        onCallSelect={setSelectedCall}
      />

      {/* Modals */}
      <AnimatePresence>
        {selectedCall && (
          <CallModal
            callId={selectedCall}
            isOpen={!!selectedCall}
            onClose={() => setSelectedCall(null)}
          />
        )}
        
        {isNewCallOpen && (
          <NewCallModal
            isOpen={isNewCallOpen}
            onClose={() => setIsNewCallOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

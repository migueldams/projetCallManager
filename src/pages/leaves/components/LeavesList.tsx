
import { motion } from 'framer-motion';
import type { LeaveRequest } from '../../../types';

interface LeavesListProps {
  requests: LeaveRequest[];
}

const statusConfig = {
  pending: {
    label: 'En attente',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    icon: 'ri-time-line',
  },
  approved: {
    label: 'Approuvé',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    icon: 'ri-check-line',
  },
  rejected: {
    label: 'Refusé',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    icon: 'ri-close-line',
  },
};

const typeConfig = {
  conge_paye: { label: 'Congés payés', icon: 'ri-sun-line', color: 'text-yellow-600' },
  conge_maladie: { label: 'Congé maladie', icon: 'ri-heart-pulse-line', color: 'text-red-600' },
  conge_maternite: { label: 'Congé maternité', icon: 'ri-baby-line', color: 'text-pink-600' },
  formation: { label: 'Formation', icon: 'ri-graduation-cap-line', color: 'text-blue-600' },
  personnel: { label: 'Congé personnel', icon: 'ri-user-line', color: 'text-purple-600' },
};

// Mock data si aucune demande
const mockRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '3',
    type: 'conge_paye',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    days: 5,
    reason: 'Vacances d\'été avec famille',
    status: 'approved',
    createdAt: '2024-01-10T10:00:00Z',
    urgency: 'normal',
  },
  {
    id: '2',
    userId: '3',
    type: 'formation',
    startDate: '2024-02-20',
    endDate: '2024-02-21',
    days: 2,
    reason: 'Formation techniques de vente avancées',
    status: 'pending',
    createdAt: '2024-01-15T14:30:00Z',
    urgency: 'high',
  },
];

export default function LeavesList({ requests }: LeavesListProps) {
  const displayRequests = requests.length > 0 ? requests : mockRequests;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mes demandes de congés
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {displayRequests.length} demande{displayRequests.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Requests List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayRequests.map((request, index) => {
          const typeInfo = typeConfig[request.type];
          const statusInfo = statusConfig[request.status];
          
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Type Icon */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                    <i className={`${typeInfo.icon} ${typeInfo.color}`}></i>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {typeInfo.label}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <i className={`${statusInfo.icon} mr-1`}></i>
                        {statusInfo.label}
                      </span>
                      {request.urgency === 'high' || request.urgency === 'urgent' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          <i className="ri-alarm-warning-line mr-1"></i>
                          Urgent
                        </span>
                      ) : null}
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <i className="ri-calendar-line mr-1"></i>
                          Du {new Date(request.startDate).toLocaleDateString('fr-FR')} au {new Date(request.endDate).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i>
                          {request.days} jour{request.days > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white">
                        {request.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Demandé le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {request.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 cursor-pointer"
                      title="Modifier la demande"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 cursor-pointer"
                    title="Plus d'options"
                  >
                    <i className="ri-more-line text-lg"></i>
                  </motion.button>
                </div>
              </div>

              {/* Progress for approved requests */}
              {request.status === 'approved' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Congés programmés
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Confirmé
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {displayRequests.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-calendar-line text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune demande de congé trouvée
          </p>
        </div>
      )}
    </motion.div>
  );
}

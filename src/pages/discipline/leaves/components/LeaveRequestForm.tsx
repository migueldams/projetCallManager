
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '../../../../store/appStore';
import { useAuthStore } from '../../../../store/authStore';
import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import type { LeaveRequest } from '../../../../types';

interface LeaveRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const leaveTypes = [
  { value: 'conge_paye', label: 'Congés payés', icon: 'ri-sun-line' },
  { value: 'conge_maladie', label: 'Congé maladie', icon: 'ri-heart-pulse-line' },
  { value: 'conge_maternite', label: 'Congé maternité', icon: 'ri-baby-line' },
  { value: 'conge_paternite', label: 'Congé paternité', icon: 'ri-parent-line' },
  { value: 'formation', label: 'Formation', icon: 'ri-graduation-cap-line' },
  { value: 'personnel', label: 'Congé personnel', icon: 'ri-user-line' },
];

export default function LeaveRequestForm({ isOpen, onClose }: LeaveRequestFormProps) {
  const { addLeaveRequest } = useAppStore();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: 'conge_paye',
    startDate: '',
    endDate: '',
    reason: '',
    urgency: 'normal',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async () => {
    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newRequest: LeaveRequest = {
        id: `leave-${Date.now()}`,
        userId: user?.id || '1',
        type: formData.type as any,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: calculateDays(),
        reason: formData.reason,
        status: 'pending',
        createdAt: new Date().toISOString(),
        urgency: formData.urgency as any,
      };

      addLeaveRequest(newRequest);
      toast.success('Demande de congé soumise avec succès !');
      onClose();
      
      setFormData({
        type: 'conge_paye',
        startDate: '',
        endDate: '',
        reason: '',
        urgency: 'normal',
      });
    } catch (error) {
      toast.error('Erreur lors de la soumission de la demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = leaveTypes.find(type => type.value === formData.type);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        </Dialog.Overlay>
        
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-calendar-add-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Nouvelle demande de congé
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Soumettez votre demande d'absence
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </motion.button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Type de congé *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {leaveTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInputChange('type', type.value)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.type === type.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <i className={`${type.icon} text-2xl mb-2 ${
                          formData.type === type.value ? 'text-primary-600' : 'text-gray-400'
                        }`}></i>
                        <p className={`text-sm font-medium ${
                          formData.type === type.value 
                            ? 'text-primary-900 dark:text-primary-100' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {type.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date de début *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date de fin *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Days Calculation */}
              {formData.startDate && formData.endDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-800 dark:text-primary-200">
                      Durée totale
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {calculateDays()} jour{calculateDays() > 1 ? 's' : ''}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Urgence
                </label>
                <div className="flex space-x-3">
                  {[
                    { value: 'low', label: 'Faible', color: 'text-green-600' },
                    { value: 'normal', label: 'Normale', color: 'text-blue-600' },
                    { value: 'high', label: 'Élevée', color: 'text-orange-600' },
                    { value: 'urgent', label: 'Urgente', color: 'text-red-600' },
                  ].map((urgency) => (
                    <motion.button
                      key={urgency.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('urgency', urgency.value)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        formData.urgency === urgency.value
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {urgency.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Motif détaillé *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Décrivez le motif de votre demande de congé..."
                  className="w-full h-24 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              {/* AI Suggestions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <i className="ri-robot-line text-blue-600 dark:text-blue-400 mt-0.5"></i>
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Suggestions IA
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      • Période recommandée : {selectedType?.label} optimal en juillet
                      <br />
                      • Votre solde actuel permet cette durée
                      <br />
                      • Équipe disponible durant cette période
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer whitespace-nowrap"
              >
                Annuler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.startDate || !formData.endDate || !formData.reason.trim()}
                className="px-6 py-2 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <i className="ri-loader-4-line"></i>
                    </motion.div>
                    <span>Envoi...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <i className="ri-send-plane-line"></i>
                    <span>Soumettre la demande</span>
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

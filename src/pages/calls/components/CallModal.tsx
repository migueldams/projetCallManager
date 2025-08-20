
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../../store/appStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

interface CallModalProps {
  callId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CallModal({ callId, isOpen, onClose }: CallModalProps) {
  const { calls, updateCall } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [outcome, setOutcome] = useState('');
  
  const call = calls.find(c => c.id === callId);
  
  if (!call) return null;

  const handleSave = () => {
    updateCall(callId, {
      notes: notes || call.notes,
      outcome: outcome || call.outcome,
    });
    setIsEditing(false);
  };

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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-phone-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Détails de l'appel
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {call.customerName} • {call.campaign}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-2xl hover:bg-primary-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center space-x-2">
                    <i className={isEditing ? 'ri-close-line' : 'ri-edit-line'}></i>
                    <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Call Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Informations client
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nom :</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {call.customerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Téléphone :</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {call.customerPhone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Détails de l'appel
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Campagne :</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {call.campaign}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Début :</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {new Date(call.startTime).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Durée :</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {call.duration} minutes
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Statut :</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {call.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Tags automatiques (IA)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {call.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        >
                          <i className="ri-price-tag-3-line mr-1"></i>
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Recording */}
                  {call.recording && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                        Enregistrement
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-play-circle-line"></i>
                        <span>Écouter l'enregistrement</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Right Column - Notes & Outcome */}
                <div className="space-y-6">
                  {/* Outcome */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Résultat de l'appel
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={outcome || call.outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                        placeholder="Décrivez le résultat de cet appel..."
                        className="w-full h-20 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
                        <p className="text-gray-900 dark:text-white">
                          {call.outcome || 'Aucun résultat renseigné'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Notes détaillées
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={notes || call.notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ajoutez des notes détaillées sur cet appel..."
                        className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl min-h-32">
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                          {call.notes || 'Aucune note ajoutée'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-2xl border border-purple-200 dark:border-purple-800">
                    <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                      <i className="ri-robot-line mr-2"></i>
                      Suggestions IA
                    </h3>
                    <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                      <li className="flex items-start space-x-2">
                        <i className="ri-arrow-right-s-line mt-0.5"></i>
                        <span>Ce client montre un fort intérêt, programmer un suivi dans 48h</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <i className="ri-arrow-right-s-line mt-0.5"></i>
                        <span>Mentionner la promotion limitée lors du prochain contact</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            {isEditing && (
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer whitespace-nowrap"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-6 py-2 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Sauvegarder
                </motion.button>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

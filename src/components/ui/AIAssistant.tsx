
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { useState, useEffect } from 'react';

const aiSuggestions = [
  {
    id: '1',
    type: 'insight',
    message: 'Vous avez 3 appels en attente de suivi. Voulez-vous que je les programme ?',
    action: 'Programmer les rappels',
  },
  {
    id: '2',
    type: 'warning',
    message: 'Stock faible détecté : Licences CRM (5 restantes)',
    action: 'Voir le stock',
  },
  {
    id: '3',
    type: 'suggestion',
    message: 'Votre taux de conversion est en hausse de 12% cette semaine !',
    action: 'Voir les détails',
  },
];

export default function AIAssistant() {
  const { aiAssistantOpen, toggleAIAssistant } = useAppStore();
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(aiSuggestions);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsTyping(true);
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      // Add AI response logic here
    }, 1500);

    setMessage('');
  };

  if (!aiAssistantOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        className="fixed right-6 bottom-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center"
            >
              <i className="ri-robot-line text-white"></i>
            </motion.div>
            <div>
              <h3 className="font-medium">Assistant IA</h3>
              <p className="text-xs opacity-90">Pulse AI - Version 2.1</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAIAssistant}
            className="p-1 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-white"></i>
          </motion.button>
        </div>

        {/* Content */}
        <div className="h-96 flex flex-col">
          {/* Suggestions */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Bonjour {user?.firstName} ! Voici mes suggestions du moment :
            </div>

            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-2xl cursor-pointer transition-colors ${
                  suggestion.type === 'warning' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                  suggestion.type === 'insight' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                  'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    suggestion.type === 'warning' ? 'bg-red-500' :
                    suggestion.type === 'insight' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}>
                    <i className={`${
                      suggestion.type === 'warning' ? 'ri-alert-line' :
                      suggestion.type === 'insight' ? 'ri-lightbulb-line' :
                      'ri-thumb-up-line'
                    } text-white text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                      {suggestion.message}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                        suggestion.type === 'warning' ? 'bg-red-500 text-white hover:bg-red-600' :
                        suggestion.type === 'insight' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                        'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {suggestion.action}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 p-3"
              >
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <i className="ri-robot-line text-white text-sm"></i>
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Posez-moi une question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-2 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-send-plane-line"></i>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

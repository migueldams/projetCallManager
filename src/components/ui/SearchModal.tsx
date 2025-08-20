
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchSuggestions = [
  { type: 'action', label: 'Créer un nouvel appel', icon: 'ri-phone-line', path: '/calls/new' },
  { type: 'action', label: 'Pointer son arrivée', icon: 'ri-time-line', path: '/timetracking' },
  { type: 'page', label: 'Tableau de bord', icon: 'ri-dashboard-line', path: '/dashboard' },
  { type: 'user', label: 'Sophie Leroy - Agent', icon: 'ri-user-line', path: '/users/3' },
  { type: 'data', label: 'Campagne Vente Premium', icon: 'ri-megaphone-line', path: '/calls?campaign=premium' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(searchSuggestions);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchSuggestions.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(searchSuggestions);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle modal
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/3 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <i className="ri-search-line text-gray-400 text-xl mr-3"></i>
              <input
                type="text"
                placeholder="Rechercher dans Pulse Manager..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border ml-3">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <div className="p-2">
                  {filteredResults.map((item, index) => (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        // Navigate to item.path
                        onClose();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-left"
                    >
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        item.type === 'action' ? 'bg-primary-100 text-primary-600' :
                        item.type === 'page' ? 'bg-gray-100 text-gray-600' :
                        item.type === 'user' ? 'bg-green-100 text-green-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <i className={`${item.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.type}</p>
                      </div>
                      <div className="text-gray-400">
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <i className="ri-search-line text-4xl mb-3"></i>
                  <p>Aucun résultat trouvé pour "{query}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-750 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded border">↑</kbd>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded border">↓</kbd>
                  <span>naviguer</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded border">↵</kbd>
                  <span>sélectionner</span>
                </div>
              </div>
              <div className="text-primary-600">Recherche IA activée</div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

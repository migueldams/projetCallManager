import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { api } from '../../../store/authStore';
import { getToken } from '../../../utils/auth'



interface UserEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions = [
  { value: 'in_stock', label: 'en stock', icon: 'ri-user-line' },
  { value: 'daf', label: 'Direction financier', icon: 'ri-briefcase-line' },
  { value: 'rh', label: 'Ressource humaine', icon: 'ri-folder-line' },
];


export default function StocksEdit({  isOpen, onClose }: UserEditorProps) {

  const [formStock, setFormStock] = useState({ id: "",
    name: "",
    category: "",
    quantity: 0,
    minThreshold: 0,
    price: 0,
    supplier: "CM",
    status: "in_stock"});

  const [isSaving, setIsSaving] = useState(false);


  const handleSave = async () => {

    try{
      
      await api.post('/post/api/createStock',formStock ,{
        headers: {
          Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
        }
      } )
      onClose()
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <i className="ri-edit-line text-white text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Nouvelle stock
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Créez une nouvelle stock
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormStock({ ...formStock, status: formStock.status })}
                className={`p-2 rounded-2xl transition-all cursor-pointer ${formStock.status
                  ? 'bg-red-100 text-blue-600 dark:bg-red-900/30 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                title={formStock.status ? 'en-ligne' : 'hors-ligne'}
              >
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <form action="" onSubmit={() => { handleSave() }} >
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Title */}
                <div className='flex'>
                  <div className='w-1/2' >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'artircle*
                  </label>
                  <input
                    type="text"
                    value={formStock.name}
                    onChange={(e)=>setFormStock({...formStock,name :e.target.value})}
                    onKeyPress={handleKeyPress}
                    placeholder="entrer le nom de l'article ..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                {/* Category and Priority */}
                <div className='w-1/2 ml-1' >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    category de l'article *
                  </label>
                  <input
                    type="text"
                    value={formStock.category}
                    onChange={(e)=>setFormStock({...formStock,category :e.target.value})}
                    onKeyPress={handleKeyPress}
                    placeholder= "entrer la catégory..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    supplier *
                  </label>
                  <input
                    type="text"
                    value={formStock.supplier}
                    onChange={(e)=>setFormStock({...formStock,supplier :e.target.value}) }
                    onKeyPress={handleKeyPress}
                    placeholder= 'enter votre nom de votre fornisseur'
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prix l'unitaire *
                  </label>
                  <input
                    type="number"
                    value={formStock.price}
                    onChange={(e) => setFormStock({ ...formStock, price: Number(e.target.value) })}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantité actuel *
                  </label>
                  <input
                    type="number"
                    value={formStock.quantity}
                    onChange={(e) => setFormStock({ ...formStock, quantity: Number(e.target.value) })}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />

                </div>
                {/* Category and Priority */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        value={formStock.status}
                        onChange={(e) => setFormStock({ ...formStock, status: e.target.value })}
                        className="w-full px-4 py-3 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      quantité minimal pour l'article
                    </label>
                    <div className="relative">
                      <input
                        type='number'
                        value={formStock.minThreshold}
                        onChange={(e) => setFormStock({ ...formStock, minThreshold: Number(e.target.value) })}
                        className="w-full px-4 py-3 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none"
                      />
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                {/* Content */}

                {/* Tags */}

                {/* AI Suggestions */}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <i className="ri-information-line"></i>
                <span>Ctrl/Cmd + Entrée pour sauvegarder</span>
              </div>

              <div className="flex items-center space-x-3">
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
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line"></i>
                      <span> 'Créer'</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
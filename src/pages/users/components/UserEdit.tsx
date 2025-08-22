import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { api } from '../../../store/authStore';
import { getToken } from '../../../utils/auth'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: String;
  email: string;
  content: String;
  role: 'Admin' | 'RH' | 'Superviseur' | 'Agent' | 'Manager';
  department: string;
  status_activite: 'active' | 'inactive' | 'suspended';
  isActive: boolean;
  lastLogin: string;
  avatar: string;
  permissions: string[];
}


interface UserEditorProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const roleOptions = [
  { value: 'dg', label: 'Direction generale', icon: 'ri-user-line' },
  { value: 'daf', label: 'Direction financier', icon: 'ri-briefcase-line' },
  { value: 'rh', label: 'Ressource humaine', icon: 'ri-folder-line' },
  { value: 'supervisor', label: 'superviseur', icon: 'ri-lightbulb-line' },
  { value: 'agent', label: 'Agent', icon: 'ri-team-line' },
  { value: 'admin', label: 'Admin systeme', icon: 'ri-alarm-line' },
];

const departementOptions = [
  { value: 'Direction', label: 'Direction', color: 'text-green-600' },
  { value: 'call-center', label: 'call-center', color: 'text-yellow-600' },
  { value: 'externe', label: 'Externe', color: 'text-red-600' },
];

export default function UserEditor({ userId, isOpen, onClose }: UserEditorProps) {

  const [users, setUsers] = useState<User>()
  const [formUser, setFormUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    content: '',
    role: 'Admin',
    department: '',
    status_activite: 'active',
    isActive: true,
    lastLogin: '',
    avatar: '',
    permissions: [],
  });

  const [isSaving, setIsSaving] = useState(false);

  // charger l'utilisateur 
  useEffect(() => {

    if (userId) {

       api.get(`post/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
        }
      }).then(res => {
        console.log(res.data.user)
        setUsers(res.data.user)
      })
    }

  })

  const handleSave = async () => {

    try{
      
    if (userId === null) {
      await api.post('/post/api/createUser',formUser ,{
        headers: {
          Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
        }
      } )

    }else{
      await api.post(`/post/api/updateUser/${userId}`,formUser ,{
        headers: {
          Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
        }
      } )

    }
      onClose();
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
                  {userId ? "Modifier l'/utilisateur " : "Nouvelle l'utilisateur"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userId ? 'Modifiez le compte' : 'Créez une nouvelle utilisateur'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormUser({ ...formUser, isActive: !formUser.isActive })}
                className={`p-2 rounded-2xl transition-all cursor-pointer ${formUser.isActive
                  ? 'bg-red-100 text-blue-600 dark:bg-red-900/30 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                title={formUser.isActive ? 'en-ligne' : 'hors-ligne'}
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
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formUser.lastName}
                    onChange={(e)=>setFormUser({...formUser,lastName :e.target.value})}
                    onKeyPress={handleKeyPress}
                    placeholder={userId ? `${users?.lastName}` :"entrer le nom..." }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                {/* Category and Priority */}
                <div className='w-1/2 ml-1' >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prenom *
                  </label>
                  <input
                    type="text"
                    value={formUser.firstName}
                    onChange={(e)=>setFormUser({...formUser,firstName :e.target.value})}
                    onKeyPress={handleKeyPress}
                    placeholder={userId ? `${users?.email}` : "entrer le Prenom..."}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formUser.email}
                    onChange={(e)=>setFormUser({...formUser, email :e.target.value}) }
                    onKeyPress={handleKeyPress}
                    placeholder={userId ? `${users?.email}` : 'enter votre email'}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formUser.password}
                    onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                    onKeyPress={handleKeyPress}
                    placeholder="password1234"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                    disabled
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
                        value={formUser.role}
                        onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
                        className="w-full px-4 py-3 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none"
                      >
                        {roleOptions.map(option => (
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
                      Departement
                    </label>
                    <div className="relative">
                      <select
                        value={formUser?.department}
                        onChange={(e) => setFormUser({ ...formUser, role: e.target.value })}
                        className="w-full px-4 py-3 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer appearance-none"
                      >
                        {departementOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contenu *
                  </label>
                  <textarea
                    value={formUser.content}
                    onChange={(e) => setFormUser({ ...formUser, content: e.target.value })}
                    placeholder="Écrivez le contenu de votre note ici..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={5}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formUser.content.length}/500 caractères
                  </p>
                </div>

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
                      <span>{userId ? 'Modifier' : 'Créer'}</span>
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
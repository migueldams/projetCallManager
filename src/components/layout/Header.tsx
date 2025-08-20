
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { useState } from 'react';
import SearchModal from '../ui/SearchModal';

export default function Header() {
  const { user, logout, theme, toggleTheme } = useAuthStore();
  const { sidebarCollapsed, toggleAIAssistant } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${
          sidebarCollapsed ? 'left-20' : 'left-80'
        }`}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center space-x-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <i className="ri-search-line text-gray-400"></i>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Recherche intelligente...</span>
              <div className="ml-auto flex items-center space-x-1">
                <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-600 rounded border">⌘</kbd>
                <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-600 rounded border">K</kbd>
              </div>
            </motion.button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleAIAssistant}
              className="p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <i className="ri-robot-line text-primary-600 text-xl"></i>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <i className={`${theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} text-gray-600 dark:text-gray-300 text-xl`}></i>
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer relative"
            >
              <i className="ri-notification-line text-gray-600 dark:text-gray-300 text-xl"></i>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-medium">3</span>
              </motion.div>
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <img
                  src={user?.avatar}
                  alt={user?.firstName}
                  className="w-8 h-8 rounded-2xl object-cover"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.firstName}
                </span>
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </motion.button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <i className="ri-user-line text-gray-400"></i>
                      <span className="text-sm text-gray-700 dark:text-gray-200">Mon profil</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <i className="ri-settings-line text-gray-400"></i>
                      <span className="text-sm text-gray-700 dark:text-gray-200">Paramètres</span>
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                    >
                      <i className="ri-logout-box-line text-red-500"></i>
                      <span className="text-sm text-red-600 dark:text-red-400">Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

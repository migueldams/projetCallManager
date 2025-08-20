
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { Link, useLocation } from 'react-router-dom';

const menuItems = {
  admin: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-phone-line', label: 'Gestion appels', path: '/calls' },
    { icon: 'ri-time-line', label: 'Pointage horaire', path: '/timetracking' },
    { icon: 'ri-bar-chart-line', label: 'Performances', path: '/performance' },
    { icon: 'ri-calendar-line', label: 'Permissions', path: '/leaves' },
    { icon: 'ri-sticky-note-line', label: 'Pense-bête', path: '/notes' },
    { icon: 'ri-team-line', label: 'Recrutement', path: '/recruitment' },
    { icon: 'ri-money-dollar-circle-line', label: 'Finances', path: '/finance' },
    { icon: 'ri-box-line', label: 'Stocks', path: '/inventory' },
    { icon: 'ri-user-settings-line', label: 'Utilisateurs', path: '/users' },
    { icon: 'ri-shield-check-line', label: 'RGPD', path: '/compliance' },
  ],
  agent: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-phone-line', label: 'Mes appels', path: '/calls' },
    { icon: 'ri-time-line', label: 'Pointage', path: '/timetracking' },
    { icon: 'ri-bar-chart-line', label: 'Mes performances', path: '/performance' },
    { icon: 'ri-calendar-line', label: 'Demandes congés', path: '/leaves' },
    { icon: 'ri-sticky-note-line', label: 'Notes', path: '/notes' },
  ],
  rh: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-team-line', label: 'Équipe', path: '/team' },
    { icon: 'ri-time-line', label: 'Présences', path: '/timetracking' },
    { icon: 'ri-calendar-line', label: 'Congés/Permissions', path: '/leaves' },
    { icon: 'ri-user-add-line', label: 'Recrutement', path: '/recruitment' },
    { icon: 'ri-user-settings-line', label: 'Gestion utilisateurs', path: '/users' },
    { icon: 'ri-shield-check-line', label: 'Conformité', path: '/compliance' },
  ],
  daf: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-team-line', label: 'Équipe', path: '/team' },
    { icon: 'ri-time-line', label: 'Présences', path: '/timetracking' },
    { icon: 'ri-calendar-line', label: 'Congés/Permissions', path: '/leaves' },
    { icon: 'ri-user-add-line', label: 'Recrutement', path: '/recruitment' },
    { icon: 'ri-user-settings-line', label: 'Gestion utilisateurs', path: '/users' },
    { icon: 'ri-shield-check-line', label: 'Conformité', path: '/compliance' },
  ],
  supervisor: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-team-line', label: 'Équipe', path: '/team' },
    { icon: 'ri-time-line', label: 'Présences', path: '/timetracking' },
    { icon: 'ri-calendar-line', label: 'Congés/Permissions', path: '/leaves' },
    { icon: 'ri-user-add-line', label: 'Recrutement', path: '/recruitment' },
    { icon: 'ri-user-settings-line', label: 'Gestion utilisateurs', path: '/users' },
    { icon: 'ri-shield-check-line', label: 'Conformité', path: '/compliance' },
  ],
  dg: [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/dashboard' },
    { icon: 'ri-team-line', label: 'Équipe', path: '/team' },
    { icon: 'ri-time-line', label: 'Présences', path: '/timetracking' },
    { icon: 'ri-calendar-line', label: 'Congés/Permissions', path: '/leaves' },
    { icon: 'ri-user-add-line', label: 'Recrutement', path: '/recruitment' },
    { icon: 'ri-user-settings-line', label: 'Gestion utilisateurs', path: '/users' },
    { icon: 'ri-shield-check-line', label: 'Conformité', path: '/compliance' },
  ],
};

export default function Sidebar() {
  const { user } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();

  const currentMenuItems = user ? menuItems[user.role] || menuItems.agent : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-80'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-pulse-line text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900 dark:text-white" style={{ fontFamily: "Pacifico, serif" }}>
                    Pulse Manager
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Call Center ERP</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <i className={`ri-menu-${sidebarCollapsed ? 'unfold' : 'fold'}-line text-gray-600 dark:text-gray-300`}></i>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {currentMenuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 cursor-pointer group ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center ${sidebarCollapsed ? 'mx-auto' : ''}`}>
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={user?.avatar}
              alt={user?.firstName}
              className="w-10 h-10 rounded-2xl object-cover"
            />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                    {user?.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

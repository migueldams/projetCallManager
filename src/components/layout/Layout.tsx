
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistant from '../ui/AIAssistant';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarCollapsed, isLoading } = useAppStore();

  if (!isAuthenticated) {
    return <Outlet/>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`transition-all duration-300 pt-16 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="p-6 bg-primary-300">
          <Outlet/>
        </div>
      </motion.main>

      <AIAssistant />
      <LoadingOverlay isVisible={isLoading} />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
        }}
      />
    </div>
  );
}

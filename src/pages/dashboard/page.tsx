
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import DashboardStats from './components/DashboardStats';
import RecentCalls from './components/RecentCalls';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { calls } = useAppStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}, {user?.firstName} !
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Voici un aperçu de votre activité aujourd'hui
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Aujourd'hui</p>
            <p className="text-xl font-bold text-primary-600">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
          <motion.div
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center"
          >
            <i className="ri-pulse-line text-white text-xl"></i>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Performance Chart */}
          <PerformanceChart />
          
          {/* Recent Calls */}
          <RecentCalls calls={calls} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import CheckInCard from './components/CheckInCard';
import TimeTracking from './components/TimeTracking';
import TeamPresence from './components/TeamPresence';
import toast from 'react-hot-toast';

export default function TimeTrackingPage() {
  const { user } = useAuthStore();
  const { timeEntries, checkIn, checkOut } = useAppStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if user is already checked in today
    const today = new Date().toISOString().split('T')[0];
    const entry = timeEntries.find(
      e => e.userId === user?.id && e.date === today && !e.checkOut
    );
    setTodaysEntry(entry);
    setIsCheckedIn(!!entry);
  }, [timeEntries, user]);

  const handleCheckIn = () => {
    if (user) {
      checkIn(user.id);
      setIsCheckedIn(true);
      toast.success('Pointage d\'arrivée enregistré !', {
        icon: '⏰',
      });
    }
  };

  const handleCheckOut = () => {
    if (user) {
      checkOut(user.id);
      setIsCheckedIn(false);
      toast.success('Pointage de départ enregistré !', {
        icon: '🏠',
      });
    }
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
            {user?.role === 'agent' ? 'Mon pointage' : 'Gestion des présences'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivi du temps de travail et des présences
          </p>
        </div>

        {/* Current Time Display */}
        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {currentTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentTime.toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </motion.div>

      {/* Check In/Out Card */}
      <CheckInCard
        isCheckedIn={isCheckedIn}
        todaysEntry={todaysEntry}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Time Tracking */}
        <TimeTracking userId={user?.id} />

        {/* Team Presence (Admin/RH only) */}
        {(user?.role === 'admin' || user?.role === 'rh') && (
          <TeamPresence />
        )}
      </div>
    </div>
  );
}

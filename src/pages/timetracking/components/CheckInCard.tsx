
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CheckInCardProps {
  isCheckedIn: boolean;
  todaysEntry: any;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export default function CheckInCard({ isCheckedIn, todaysEntry, onCheckIn, onCheckOut }: CheckInCardProps) {
  const [workingTime, setWorkingTime] = useState('00:00:00');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isCheckedIn && todaysEntry) {
      const interval = setInterval(() => {
        const checkInTime = new Date(todaysEntry.checkIn);
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setWorkingTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCheckedIn, todaysEntry]);

  const handleAction = () => {
    if (isCheckedIn) {
      onCheckOut();
    } else {
      onCheckIn();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 p-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-accent-500 rounded-full blur-2xl"></div>
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: Math.random() * 400,
                  y: Math.random() * 200,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  y: '+=200',
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className={`absolute w-3 h-3 ${
                  i % 3 === 0 ? 'bg-primary-500' : 
                  i % 3 === 1 ? 'bg-accent-500' : 'bg-yellow-500'
                } rounded-full`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Status & Time */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
            <motion.div
              animate={{
                scale: isCheckedIn ? [1, 1.2, 1] : 1,
                backgroundColor: isCheckedIn ? ['#22C55E', '#16A34A', '#22C55E'] : '#6B7280'
              }}
              transition={{
                duration: 2,
                repeat: isCheckedIn ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="w-4 h-4 rounded-full"
            />
            <span className={`text-lg font-semibold ${
              isCheckedIn ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isCheckedIn ? 'En service' : 'Hors service'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isCheckedIn ? workingTime : '00:00:00'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isCheckedIn ? 'Temps de travail actuel' : 'Prêt à démarrer'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className={`relative w-32 h-32 rounded-full shadow-2xl transition-all duration-300 cursor-pointer whitespace-nowrap ${
              isCheckedIn
                ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            <motion.div
              animate={{ rotate: isCheckedIn ? 0 : 360 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
            >
              <i className={`${isCheckedIn ? 'ri-logout-box-line' : 'ri-login-box-line'} text-3xl mb-2`}></i>
              <span className="text-sm font-medium">
                {isCheckedIn ? 'Sortie' : 'Arrivée'}
              </span>
            </motion.div>
            
            {/* Ripple Effect */}
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute inset-0 rounded-full ${
                isCheckedIn ? 'bg-red-400' : 'bg-green-400'
              }`}
            />
          </motion.button>
        </div>

        {/* Today's Summary */}
        <div className="text-center md:text-right space-y-4">
          {todaysEntry && (
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Résumé du jour
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Arrivée :</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {new Date(todaysEntry.checkIn).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {todaysEntry.checkOut && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sortie :</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {new Date(todaysEntry.checkOut).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total :</span>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {Math.floor(todaysEntry.duration / 60)}h {todaysEntry.duration % 60}min
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-3">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">7h 45m</div>
              <div className="text-xs text-primary-700 dark:text-primary-300">Moyenne semaine</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-3">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-xs text-green-700 dark:text-green-300">Assiduité</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

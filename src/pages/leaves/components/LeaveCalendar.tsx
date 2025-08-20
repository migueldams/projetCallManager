
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LeaveRequest } from '../../../types';

interface LeaveCalendarProps {
  requests: LeaveRequest[];
}

export default function LeaveCalendar({ requests }: LeaveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Générer les jours du mois
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const isLeaveDay = (date: Date) => {
    return requests.some(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      return date >= startDate && date <= endDate && request.status === 'approved';
    });
  };

  const isPendingLeave = (date: Date) => {
    return requests.some(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      return date >= startDate && date <= endDate && request.status === 'pending';
    });
  };

  const getLeaveForDay = (date: Date) => {
    return requests.find(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const days = generateCalendar();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Calendrier des congés
          </h3>
          
          <div className="flex items-center space-x-4">
            {/* Month Navigation */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
              </motion.button>
              
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white min-w-48 text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h4>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                <i className="ri-arrow-right-line"></i>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-200 dark:bg-green-700 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Congé approuvé</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-200 dark:bg-yellow-700 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">En attente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-200 dark:bg-primary-700 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === new Date().toDateString();
            const hasLeave = isLeaveDay(day);
            const hasPendingLeave = isPendingLeave(day);
            const leave = getLeaveForDay(day);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`relative p-3 rounded-2xl min-h-12 cursor-pointer transition-all group ${
                  isCurrentMonth
                    ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'text-gray-400 dark:text-gray-600'
                } ${
                  isToday
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                    : hasLeave
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : hasPendingLeave
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : ''
                }`}
              >
                <div className="text-center">
                  <span className={`text-sm font-medium ${
                    isCurrentMonth ? 'text-gray-900 dark:text-white' : ''
                  }`}>
                    {day.getDate()}
                  </span>
                  
                  {(hasLeave || hasPendingLeave) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-current opacity-60"></div>
                  )}
                </div>

                {/* Tooltip on hover */}
                {leave && (
                  <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg py-2 px-3 -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {leave.type === 'conge_paye' ? 'Congés payés' : 
                     leave.type === 'conge_maladie' ? 'Congé maladie' : 
                     leave.type === 'formation' ? 'Formation' : 'Congé personnel'}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Leaves Summary */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Prochains congés
        </h4>
        <div className="space-y-2">
          {requests
            .filter(req => new Date(req.startDate) > new Date() && req.status === 'approved')
            .slice(0, 3)
            .map((request) => (
              <div key={request.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(request.startDate).toLocaleDateString('fr-FR')} - {new Date(request.endDate).toLocaleDateString('fr-FR')}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {request.days} jour{request.days > 1 ? 's' : ''}
                </span>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

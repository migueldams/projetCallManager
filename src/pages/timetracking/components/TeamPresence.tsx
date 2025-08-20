import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '../../../store/appStore';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'present' | 'absent' | 'break';
  checkIn?: string;
  workingTime: string;
}

export default function TeamPresence() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');

  useEffect(() => {
    // Mock team data
    const mockTeam: TeamMember[] = [
      {
        id: '1',
        name: 'Sophie Martin',
        role: 'Agent Senior',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20with%20short%20brown%20hair%20wearing%20business%20attire%2C%20office%20setting%2C%20friendly%20smile%2C%20corporate%20headshot%20style&width=40&height=40&seq=avatar1&orientation=squarish',
        status: 'present',
        checkIn: '08:30',
        workingTime: '07:45:23'
      },
      {
        id: '2',
        name: 'Marc Dubois',
        role: 'Agent',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20man%20with%20glasses%20wearing%20business%20shirt%2C%20office%20environment%2C%20confident%20expression%2C%20corporate%20headshot%20style&width=40&height=40&seq=avatar2&orientation=squarish',
        status: 'break',
        checkIn: '09:00',
        workingTime: '07:15:10'
      },
      {
        id: '3',
        name: 'Laura Chen',
        role: 'Superviseur',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20woman%20with%20long%20black%20hair%20wearing%20elegant%20blazer%2C%20modern%20office%20background%2C%20warm%20smile%2C%20executive%20portrait&width=40&height=40&seq=avatar3&orientation=squarish',
        status: 'present',
        checkIn: '08:15',
        workingTime: '08:00:45'
      },
      {
        id: '4',
        name: 'Pierre Moreau',
        role: 'Agent',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20man%20with%20beard%20wearing%20casual%20business%20shirt%2C%20office%20setting%2C%20friendly%20demeanor%2C%20team%20member%20portrait&width=40&height=40&seq=avatar4&orientation=squarish',
        status: 'absent',
        checkIn: undefined,
        workingTime: '00:00:00'
      },
      {
        id: '5',
        name: 'Emma Rodriguez',
        role: 'Agent Senior',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20woman%20with%20curly%20hair%20wearing%20professional%20attire%2C%20bright%20office%20background%2C%20confident%20smile%2C%20business%20portrait&width=40&height=40&seq=avatar5&orientation=squarish',
        status: 'present',
        checkIn: '08:45',
        workingTime: '07:30:15'
      }
    ];
    
    setTeamMembers(mockTeam);
  }, []);

  const filteredMembers = teamMembers.filter(member => {
    if (filter === 'all') return true;
    return member.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'break': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20';
      case 'absent': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return 'ri-checkbox-circle-fill';
      case 'break': return 'ri-pause-circle-fill';
      case 'absent': return 'ri-close-circle-fill';
      default: return 'ri-question-fill';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'Présent';
      case 'break': return 'En pause';
      case 'absent': return 'Absent';
      default: return 'Inconnu';
    }
  };

  const presentCount = teamMembers.filter(m => m.status === 'present').length;
  const totalCount = teamMembers.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Présences équipe
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {presentCount}/{totalCount} agents présents
            </p>
          </div>
          
          {/* Status Overview */}
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {presentCount}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Présents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {teamMembers.filter(m => m.status === 'break').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">En pause</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {teamMembers.filter(m => m.status === 'absent').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Absents</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6">
          {[
            { key: 'all', label: 'Tous', count: totalCount },
            { key: 'present', label: 'Présents', count: presentCount },
            { key: 'absent', label: 'Absents', count: teamMembers.filter(m => m.status === 'absent').length }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === filterOption.key
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </motion.button>
          ))}
        </div>

        {/* Team Members List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover object-top"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                    member.status === 'present' ? 'bg-green-500' :
                    member.status === 'break' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Working Time */}
                {member.status !== 'absent' && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.workingTime}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Depuis {member.checkIn}
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(member.status)}`}>
                  <i className={`${getStatusIcon(member.status)} text-sm`}></i>
                  <span>{getStatusLabel(member.status)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions rapides
            </span>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-xs bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-notification-line mr-1"></i>
                Rappel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-file-text-line mr-1"></i>
                Rapport
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
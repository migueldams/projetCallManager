
import { motion } from 'framer-motion';

interface TeamRankingProps {
  period: string;
}

const teamData = [
  {
    id: '1',
    name: 'Sophie Leroy',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20call%20center%20agent%20portrait%2C%20headset%20around%20neck%2C%20bright%20office%20environment%2C%20confident%20smile&width=150&height=150&seq=agent-1&orientation=squarish',
    score: 98,
    calls: 89,
    sales: 34,
    change: 12,
  },
  {
    id: '2',
    name: 'Marc Dubois',
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20male%20call%20center%20agent%20portrait%2C%20business%20casual%20attire%2C%20modern%20office%20background&width=150&height=150&seq=agent-2&orientation=squarish',
    score: 94,
    calls: 76,
    sales: 28,
    change: 8,
  },
  {
    id: '3',
    name: 'Julie Martin',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20agent%20portrait%2C%20friendly%20smile%2C%20call%20center%20environment%2C%20professional%20attire&width=150&height=150&seq=agent-3&orientation=squarish',
    score: 91,
    calls: 82,
    sales: 25,
    change: -3,
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20call%20center%20representative%2C%20confident%20expression%2C%20modern%20workplace%20setting&width=150&height=150&seq=agent-4&orientation=squarish',
    score: 88,
    calls: 71,
    sales: 22,
    change: 15,
  },
  {
    id: '5',
    name: 'Emma Rousseau',
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20female%20agent%2C%20warm%20smile%2C%20call%20center%20background%2C%20business%20attire&width=150&height=150&seq=agent-5&orientation=squarish',
    score: 85,
    calls: 68,
    sales: 19,
    change: 5,
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return { icon: 'ri-trophy-line', color: 'text-yellow-500' };
    case 2: return { icon: 'ri-medal-line', color: 'text-gray-400' };
    case 3: return { icon: 'ri-award-line', color: 'text-orange-600' };
    default: return { icon: 'ri-user-line', color: 'text-gray-400' };
  }
};

export default function TeamRanking({ period }: TeamRankingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <i className="ri-trophy-line text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Classement Équipe
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Top performers ce mois
            </p>
          </div>
        </div>
      </div>

      {/* Ranking List */}
      <div className="p-6">
        <div className="space-y-4">
          {teamData.map((agent, index) => {
            const rank = index + 1;
            const rankData = getRankIcon(rank);
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8">
                  {rank <= 3 ? (
                    <i className={`${rankData.icon} ${rankData.color} text-xl`}></i>
                  ) : (
                    <span className="text-lg font-bold text-gray-400">#{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    agent.change > 0 ? 'bg-green-500' : agent.change < 0 ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                    {agent.change > 0 ? '+' : ''}{agent.change}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {agent.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{agent.calls} appels</span>
                    <span>{agent.sales} ventes</span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {agent.score}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    points
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 text-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 border border-primary-200 dark:border-primary-800 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer"
        >
          Voir le classement complet
        </motion.button>
      </div>
    </motion.div>
  );
}


import { motion } from 'framer-motion';

interface NoteFiltersProps {
  filters: {
    category: string;
    priority: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  totalNotes: number;
}

const categoryOptions = [
  { value: 'all', label: 'Toutes catégories', icon: 'ri-folder-line' },
  { value: 'personal', label: 'Personnel', icon: 'ri-user-line' },
  { value: 'work', label: 'Travail', icon: 'ri-briefcase-line' },
  { value: 'project', label: 'Projet', icon: 'ri-folder-line' },
  { value: 'idea', label: 'Idée', icon: 'ri-lightbulb-line' },
  { value: 'meeting', label: 'Réunion', icon: 'ri-team-line' },
  { value: 'reminder', label: 'Rappel', icon: 'ri-alarm-line' },
];

const priorityOptions = [
  { value: 'all', label: 'Toutes priorités' },
  { value: 'low', label: 'Basse' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'high', label: 'Haute' },
];

export default function NoteFilters({ filters, onFiltersChange, totalNotes }: NoteFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: 'all',
      priority: 'all',
      search: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
            <i className="ri-filter-line text-white text-sm"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filtres & Organisation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalNotes} note{totalNotes > 1 ? 's' : ''} au total
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
        >
          <div className="flex items-center space-x-1">
            <i className="ri-refresh-line"></i>
            <span>Réinitialiser</span>
          </div>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Search */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recherche
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Rechercher dans les notes..."
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm cursor-pointer appearance-none"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priorité
          </label>
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-4 py-2 pr-8 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm cursor-pointer appearance-none"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Filtres rapides
        </p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.slice(1).map((category) => (
            <motion.button
              key={category.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('category', category.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-2xl text-sm transition-all cursor-pointer whitespace-nowrap ${
                filters.category === category.value
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              <i className={category.icon}></i>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
        {Object.entries(filters).map(([key, value]) => (
          value !== 'all' && value !== '' && (
            <motion.span
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-xs"
            >
              <span>{value}</span>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleFilterChange(key, key === 'search' ? '' : 'all')}
                className="cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </motion.button>
            </motion.span>
          )
        ))}
      </div>
    </motion.div>
  );
}

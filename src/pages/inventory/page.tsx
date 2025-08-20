
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

export default function InventoryPage() {
  const { stocks } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredInventory = stocks.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalItems: stocks.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: stocks.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    lowStockItems: stocks.filter(item => item.status === 'low_stock').length,
    outOfStockItems: stocks.filter(item => item.status === 'out_of_stock').length
  };

  const categories = ['all', ...new Set(stocks.map(item => item.category))];
  
  const statusColors = {
    'in_stock': 'bg-green-100 text-green-800 border-green-200',
    'low_stock': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'out_of_stock': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Stocks</h1>
          <p className="text-gray-600 dark:text-gray-400">Suivez et gérez les niveaux d'inventaire</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line w-4 h-4 mr-2"></i>
          Ajouter un Article
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Articles Total', 
            value: stats.totalItems, 
            color: 'blue', 
            icon: 'ri-package-line',
            format: 'number'
          },
          { 
            label: 'Valeur Inventaire', 
            value: stats.totalValue, 
            color: 'green', 
            icon: 'ri-money-euro-circle-line',
            format: 'currency'
          },
          { 
            label: 'Stock Faible', 
            value: stats.lowStockItems, 
            color: 'yellow', 
            icon: 'ri-error-warning-line',
            format: 'number'
          },
          { 
            label: 'Rupture Stock', 
            value: stats.outOfStockItems, 
            color: 'red', 
            icon: 'ri-close-circle-line',
            format: 'number'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.format === 'currency' ? `€${stat.value.toLocaleString()}` : stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 w-12 h-12 flex items-center justify-center`}>
                <i className={`${stat.icon} text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Rechercher dans l'inventaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <i className="ri-filter-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes Catégories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
            >
              <option value="all">Tous Statuts</option>
              <option value="in_stock">En Stock</option>
              <option value="low_stock">Stock Faible</option>
              <option value="out_of_stock">Rupture</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Articles d'Inventaire</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Article</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Catégorie</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Niveau Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Valeur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Fournisseur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Prix unitaire: €{item.price}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                            <span className="text-gray-500">Min: {item.minThreshold}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                item.quantity <= item.minThreshold 
                                  ? 'bg-red-500' 
                                  : item.quantity <= item.minThreshold * 1.5 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((item.quantity / (item.minThreshold * 2)) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                      €{(item.quantity * item.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.supplier}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[item.status || 'in_stock']}`}>
                        {item.status === 'in_stock' ? 'En Stock' :
                         item.status === 'low_stock' ? 'Stock Faible' : 'Rupture'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium cursor-pointer"
                        >
                          Réapprovisionner
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Inventory Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🤖 Assistant IA - Insights Inventaire</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Optimisation Stock</p>
                <p className="text-gray-600 dark:text-gray-400">Les ordinateurs portables sont en rupture - recommande commande urgente chez Dell France</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Analyse Coûts</p>
                <p className="text-gray-600 dark:text-gray-400">Le matériel représente 65% de la valeur d'inventaire - surveiller de près</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Recommandations</p>
                <p className="text-gray-600 dark:text-gray-400">Moment optimal pour réapprovisionner les casques dans 2 semaines selon les tendances d'usage</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

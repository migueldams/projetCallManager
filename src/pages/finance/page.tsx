
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Fév', revenue: 52000, expenses: 34000, profit: 18000 },
  { month: 'Mar', revenue: 48000, expenses: 31000, profit: 17000 },
  { month: 'Avr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'Mai', revenue: 55000, expenses: 35000, profit: 20000 },
  { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 }
];

const expensesData = [
  { name: 'Salaires', value: 45000, color: '#3B82F6' },
  { name: 'Technologie', value: 12000, color: '#8B5CF6' },
  { name: 'Loyer Bureau', value: 8000, color: '#10B981' },
  { name: 'Marketing', value: 6000, color: '#F59E0B' },
  { name: 'Utilitaires', value: 3000, color: '#EF4444' },
  { name: 'Autres', value: 5000, color: '#6B7280' }
];

const transactions = [
  { id: 1, description: 'Paiement Client - TechCorp', amount: 15000, type: 'income', date: '2024-01-20' },
  { id: 2, description: 'Fournitures Bureau', amount: -450, type: 'expense', date: '2024-01-19' },
  { id: 3, description: 'Licence Logiciel', amount: -2400, type: 'expense', date: '2024-01-18' },
  { id: 4, description: 'Paiement Client - RetailCo', amount: 8500, type: 'income', date: '2024-01-17' },
  { id: 5, description: 'Campagne Marketing', amount: -3200, type: 'expense', date: '2024-01-16' }
];

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const stats = {
    totalRevenue: 328000,
    totalExpenses: 211000,
    netProfit: 117000,
    profitMargin: 35.7
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rapports Financiers</h1>
          <p className="text-gray-600 dark:text-gray-400">Surveillez les revenus, dépenses et rentabilité</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-calendar-line w-4 h-4 mr-2"></i>
            6 derniers mois
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line w-4 h-4 mr-2"></i>
            Exporter Rapport
          </motion.button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Chiffre d\'Affaires', 
            value: stats.totalRevenue, 
            change: '+12.5%', 
            trend: 'up', 
            color: 'blue', 
            icon: 'ri-money-euro-circle-line' 
          },
          { 
            label: 'Total Dépenses', 
            value: stats.totalExpenses, 
            change: '+8.2%', 
            trend: 'up', 
            color: 'red', 
            icon: 'ri-bank-card-line' 
          },
          { 
            label: 'Bénéfice Net', 
            value: stats.netProfit, 
            change: '+18.7%', 
            trend: 'up', 
            color: 'green', 
            icon: 'ri-line-chart-line' 
          },
          { 
            label: 'Marge Bénéficiaire', 
            value: `${stats.profitMargin}%`, 
            change: '+2.1%', 
            trend: 'up', 
            color: 'purple', 
            icon: 'ri-bar-chart-line' 
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
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof stat.value === 'number' ? `€${stat.value.toLocaleString()}` : stat.value}
                  </p>
                  <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <i className={`${stat.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 w-12 h-12 flex items-center justify-center`}>
                <i className={`${stat.icon} text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Évolution Revenus & Bénéfices</h3>
            <div className="flex items-center space-x-2">
              <i className="ri-filter-line text-gray-400"></i>
              <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8">
                <option value="revenue">Revenus</option>
                <option value="profit">Bénéfices</option>
                <option value="expenses">Dépenses</option>
              </select>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Répartition des Dépenses</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Monthly Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance Mensuelle</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transactions Récentes</h3>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-2xl ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'} w-10 h-10 flex items-center justify-center`}>
                    <i className={`${transaction.type === 'income' ? 'ri-arrow-up-line text-green-600 dark:text-green-400' : 'ri-arrow-down-line text-red-600 dark:text-red-400'}`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Financial Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🤖 Assistant IA - Insights Financiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Croissance Revenus</p>
                <p className="text-gray-600 dark:text-gray-400">Les revenus sont en hausse avec une croissance de 12,5% ce trimestre</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Optimisation Coûts</p>
                <p className="text-gray-600 dark:text-gray-400">Envisagez de réviser les dépenses technologiques pour des économies potentielles</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Flux de Trésorerie</p>
                <p className="text-gray-600 dark:text-gray-400">Position de flux de trésorerie solide avec des marges bénéficiaires saines</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

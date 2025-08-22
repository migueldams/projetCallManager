import UserEditor from './components/UserEdit'
import UserView from './components/UserView';
import { api } from '../../store/authStore';
import { getToken } from '../../utils/auth';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'RH' | 'Superviseur' | 'Agent' | 'Manager';
  department: string;
  status_activite: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar: string;
  permissions: string[];
}


const statusColors = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  suspended: 'bg-red-100 text-red-800 border-red-200'
};

const roleColors = {
  Admin: 'bg-purple-100 text-purple-800',
  RH: 'bg-blue-100 text-blue-800',
  Superviseur: 'bg-indigo-100 text-indigo-800',
  Agent: 'bg-green-100 text-green-800',
  Manager: 'bg-orange-100 text-orange-800'
};

const statusLabels = {
  active: 'Actif',
  inactive: 'Inactif',
  suspended: 'Suspendu'
};

export default function UsersPage() {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false)
  //   const isAgent = (user: User): boolean => {
  //   return user.role === "Agent";
  // };
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditorOpen(true);
  };

  const handleViewUser = (userId :string) =>{
    setSelectedUser(userId)
    setIsViewOpen(true)
  }

  const handleEditUser = (noteId: string) => {
    setSelectedUser(noteId);
    setIsEditorOpen(true);
  };

  const handlerDeleteUser = (userId: String)=> {
    
    api.delete(`/post/api/deleteUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
      }).then(_=>{
      api.get('/post/api/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
      }).then((res) => {
      if (res.status === 200) {
        setUsers(res.data.User)
      }

    })
    })

  }



  useEffect(() => {

    api.get('/post/api/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
      }
    }).then((res) => {
      if (res.status === 200) {
        setUsers(res.data.User)
      }

    })
  }, [])



  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status_activite === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status_activite === 'active').length,
    inactiveUsers: users.filter(u => u.status_activite === 'inactive').length,
    adminUsers: users.filter(u => u.role === 'Admin').length
  };

  const roles = ['all', ...new Set(users.map(user => user.role))];
  const departments = ['all', ...new Set(users.map(user => user.department))];

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status_activite === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : user
    ));
  };

  // Hide admin functions for non-admin users
  if (currentUser?.role !== 'admin') {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 text-center"
        >
          <i className="ri-lock-line text-yellow-600 text-4xl mb-4"></i>
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
            Accès Restreint
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Vous n'avez pas les permissions nécessaires pour accéder à la gestion des utilisateurs.
            <br />
            Contactez un administrateur pour obtenir l'accès.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez les comptes utilisateurs et les permissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
          onClick={()=>handleCreateUser()}
        >
          <i className="ri-user-add-line w-4 h-4 mr-2"></i>
          Ajouter Utilisateur
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Utilisateurs', value: stats.totalUsers, color: 'blue', icon: 'ri-user-line' },
          { label: 'Utilisateurs Actifs', value: stats.activeUsers, color: 'green', icon: 'ri-user-line' },
          { label: 'Utilisateurs Inactifs', value: stats.inactiveUsers, color: 'gray', icon: 'ri-user-line' },
          { label: 'Administrateurs', value: stats.adminUsers, color: 'purple', icon: 'ri-shield-line' }
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
              placeholder="Rechercher des utilisateurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <i className="ri-filter-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'Tous les Rôles' : role}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-8"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'Tous les Départements' : dept}
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
              <option value="all">Tous les Statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Utilisateurs</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rôle</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Département</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Dernière Connexion</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(
                  (user, index) => (

                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.firstName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.firstName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{user.department}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[user.status_activite]}`}>
                          {statusLabels[user.status_activite]}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                        {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-colors cursor-pointer"
                            title="Voir Détails"
                            onClick={()=>handleViewUser(user.id)}
                          >
                            <i className="ri-eye-line"></i>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-colors cursor-pointer"
                            title="Modifier Utilisateur"
                            onClick={()=>handleEditUser(user.id)}
                          >
                            <i className="ri-edit-line"></i>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleUserStatus(user.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-2xl transition-colors cursor-pointer"
                            title={user.status_activite === 'active' ? 'Désactiver' : 'Activer'}
                          >
                            <i className="ri-settings-line"></i>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors cursor-pointer"
                            title="Supprimer Utilisateur"
                            onClick={()=>handlerDeleteUser(user.id)}
                            
                          >
                            <i className="ri-delete-bin-line"></i>
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
      <AnimatePresence>
        {isEditorOpen && (
          <UserEditor
            userId={selectedUser}
            isOpen={isEditorOpen}
            onClose={() => {
              setIsEditorOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isViewOpen && (
          <UserView
            userId={selectedUser}
            isOpen={isViewOpen}
            onClose={() => {
              setIsViewOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* AI User Management Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🤖 Assistant IA - Insights Gestion Utilisateurs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Modèles d'Accès</p>
                <p className="text-gray-600 dark:text-gray-400">La plupart des utilisateurs se connectent entre 9h-11h, considérez la maintenance système en dehors de ces heures</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Répartition des Rôles</p>
                <p className="text-gray-600 dark:text-gray-400">L'équipe call center grandit - envisagez de promouvoir des agents expérimentés au poste de superviseur</p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <p className="font-medium text-gray-900 dark:text-white">Recommandations Sécurité</p>
                <p className="text-gray-600 dark:text-gray-400">Activez l'authentification à deux facteurs pour tous les utilisateurs admin et RH pour une sécurité renforcée</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

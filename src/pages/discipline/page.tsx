
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeavesPage from "./leaves/page";


export default function Discipline() {

    const [activeTab,setActiveTab]= useState('requests')
    const tabs = [
        { id: 'requests', label: 'Demandes de congés', icon: 'ri-file-list-line' },
        { id: 'calendar', label: 'solde mensuel', icon: 'ri-calendar-line' },
        { id: 'stats', label: 'deposer une requête', icon: 'ri-bar-chart-line' },
    ];

    return <div>
        <motion.div >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Discipline & suivie
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Gérez vos demandes de congés et absences
                    </p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 mb-50"
            >
                <div className="flex space-x-1">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                    : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <i className={tab.icon}></i>
                            <span className="font-medium">{tab.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'requests' && <LeavesPage />}
                    {activeTab === 'calendar' && <LeaveCalendar requests={filteredRequests} />}
                    {activeTab === 'stats' && <LeaveStats userId={user?.id} />}
                </motion.div>
            </AnimatePresence>
        </motion.div>





    </div>




}
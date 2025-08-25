import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../store/authStore';
import { getToken } from '../../../utils/auth'

export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    status: 'applied' | 'screening' | 'interview' | 'hired' | 'rejected';
    resume?: string;
    experience: number; // years
    skills: string[];
    salary: number;
    createdAt: string;
    interviewDate?: string;
    notes?: string;
}


interface UserViewProps {
    userId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CandidateView({ userId, isOpen, onClose }: UserViewProps) {

    const [users, setUsers] = useState<Candidate>()



    // charger l'utilisateur 
    useEffect(() => {
        console.log(userId)
        if (userId) {

            api.get(`post/api/Candidates/${userId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
                }
            }).then(res => {
                setUsers(res.data.candidate)
            })
        }

    },[])

    if (!isOpen) return null;



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                                <i className="ri-edit-line text-white text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {userId ? "Modifier l'/utilisateur " : "Nouvelle l'utilisateur"}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {userId ? 'Modifiez le compte' : 'Créez une nouvelle utilisateur'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-0 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="space-y-6">
                            {/* Title */}
                            <div className='flex justify-around'>
                                <div className='w-1/4 h-[200px] '>
                                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                                        <span className="text-white font-bold text-5xl">
                                            {users?.firstName[0]}{users?.lastName[0]}
                                        </span>
                                    </div>
                                </div>
                                <div className='w-1/2'>
                                    <div className='w-full' >
                                        <label className="w-full block text-sm font-sans text-gray-700 dark:text-gray-300 m-4">
                                            Nom *
                                        </label>
                                        <p
                                            className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl "
                                            autoFocus
                                        >
                                            {users?.firstName}
                                        </p>
                                    </div>
                                    {/* Category and Priority */}
                                    <div className='w-full ' >
                                        <label className="w-full block text-sm m-4 font-sans text-gray-700 dark:text-gray-300 ">
                                            Prenom *
                                        </label>
                                        <p
                                            className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                            autoFocus
                                        >
                                            {users?.lastName}
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 m-4">
                                    Email *
                                </label>
                                <p
                                    className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                    autoFocus
                                >
                                    {users?.email}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 m-4">
                                    Poste
                                </label>
                                <p
                                    className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                    autoFocus
                                >
                                    {users?.position}
                                </p>

                            </div>
                            {/* Category and Priority */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 m-4">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <p
                                            className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                            autoFocus
                                        >
                                            {users?.status}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 m-4">
                                        Departement
                                    </label>
                                    <div className="relative">
                                        <p
                                            className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                            autoFocus
                                        >
                                            {users?.experience}
                                        </p>
                                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
                                    Competences *
                                </label>
                                <p
                                    className="w-full px-4 py-3 text-sm m-4 bg-gray-50 border-b-2  rounded-xl"
                                    autoFocus
                                >
                                    {users?.skills}
                                </p>
                            </div>

                            {/* Tags */}

                            {/* AI Suggestions */}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i className="ri-information-line"></i>
                            <span>Ctrl/Cmd + Entrée pour sauvegarder</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer whitespace-nowrap"
                            >
                                Annuler
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
                            >
                                ok
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
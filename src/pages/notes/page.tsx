
import { useState } from 'react';
import { api } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion'
import NotesGrid from './components/NotesGrid';
import NoteEditor from './components/NoteEditor';
import NoteFilters from './components/NoteFilters';
import type { Note } from '../../types';
import { getToken } from '../../utils/auth';

export default function NotesPage() {
  
  const [notes,setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    search: '',
  });

  useEffect(()=>{
    
        api.get('/post/api/notes', {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Assure-toi que le token est bien défini
          }
        }).then((res) => {
          if (res.status === 200) {
            setNotes(res.data.notes)
          }
    
        })
  },[])
  const fixnotes = notes
  // Filtrer les notes selon les critères
  const filteredNotes = notes?.filter(note => {
    if (filters.category !== 'all' && note.category !== filters.category) return false;
    if (filters.priority !== 'all' && note.priority !== filters.priority) return false;
    if (filters.search && !note.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !note.content.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
})|| [];

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (noteId: string) => {
    setSelectedNote(noteId);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Pense-bête
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organisez vos notes et idées importantes
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Stats Cards */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold text-primary-600">{filteredNotes.length}</p>
                <p className="text-xs text-gray-500">Notes</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold text-red-600">
                  {filteredNotes.filter(n => n.priority === 'high').length}
                </p>
                <p className="text-xs text-gray-500">Priorité haute</p>
              </div>
            </div>
          </div>

          {/* New Note Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateNote}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            <span>Nouvelle note</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <NoteFilters 
        filters={filters} 
        onFiltersChange={setFilters}
        totalNotes={notes.length} 
      />

      {/* AI Assistant Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <i className="ri-robot-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
              Assistant IA - Suggestions de Notes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-green-800 dark:text-green-200 text-sm mb-1">
                  Notes Suggérées
                </h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  • Préparation formation équipe
                  <br />
                  • Suivi projet CRM
                  <br />
                  • Objectifs mensuel février
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-green-800 dark:text-green-200 text-sm mb-1">
                  Organisation
                </h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  7 notes non catégorisées à organiser dans vos dossiers
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-2xl">
                <h5 className="font-medium text-green-800 dark:text-green-200 text-sm mb-1">
                  Rappels
                </h5>
                <p className="text-xs text-green-700 dark:text-green-300">
                  3 notes importantes à réviser cette semaine
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notes Grid */}
      <NotesGrid 
        notes={filteredNotes}
        setNotes={setNotes}
        onEditNote={handleEditNote}
      />

      {/* Note Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            noteId={selectedNote}
            setNotes={setNotes}
            isOpen={isEditorOpen}
            onClose={() => {
              setIsEditorOpen(false);
              setSelectedNote(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

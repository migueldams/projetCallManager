
import { motion } from 'framer-motion';
import { useAppStore } from '../../../store/appStore';
import type { Note } from '../../../types';
import React from 'react';

interface NotesGridProps {
  notes: Note[];
  onEditNote: (noteId: string) => void;
}

const priorityConfig = {
  low: { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', label: 'Basse' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Moyenne' },
  high: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Haute' },
};

const categoryConfig = {
  personal: { color: 'text-blue-600', icon: 'ri-user-line', label: 'Personnel' },
  work: { color: 'text-purple-600', icon: 'ri-briefcase-line', label: 'Travail' },
  project: { color: 'text-green-600', icon: 'ri-folder-line', label: 'Projet' },
  idea: { color: 'text-orange-600', icon: 'ri-lightbulb-line', label: 'Idée' },
  meeting: { color: 'text-red-600', icon: 'ri-team-line', label: 'Réunion' },
  reminder: { color: 'text-indigo-600', icon: 'ri-alarm-line', label: 'Rappel' },
};

// Mock data si aucune note
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Formation équipe commerciale',
    content: 'Organiser formation sur les nouvelles techniques de vente pour l\'équipe. Points clés:\n- Techniques d\'objection\n- Scripts d\'appels\n- Gestion des objections clients\n- Outils CRM avancés\n\nDate prévue: 15 février 2024',
    category: 'work',
    priority: 'high',
    tags: ['formation', 'équipe', 'vente'],
    isPinned: true,
    userId: '3',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T15:30:00Z',
  },
  {
    id: '2',
    title: 'Idées amélioration interface CRM',
    content: 'Suggestions d\'amélioration pour le CRM:\n\n1. Dashboard plus intuitif\n2. Raccourcis clavier pour actions courantes\n3. Filtres avancés sur les contacts\n4. Intégration calendrier\n5. Notifications push pour rappels\n\nÀ discuter avec l\'équipe IT',
    category: 'idea',
    priority: 'medium',
    tags: ['crm', 'amélioration', 'interface'],
    isPinned: false,
    userId: '3',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    title: 'Réunion équipe - Points à aborder',
    content: '📋 Ordre du jour réunion équipe:\n\n• Résultats du mois de janvier\n• Nouveaux objectifs février\n• Retour formation commerciale\n• Point sur les nouveaux outils\n• Feedback équipe\n• Questions diverses\n\nDurée prévue: 1h30\nParticipants: toute l\'équipe',
    category: 'meeting',
    priority: 'high',
    tags: ['réunion', 'équipe', 'objectifs'],
    isPinned: true,
    userId: '3',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '4',
    title: 'Rappel: Renouveler licence logiciels',
    content: 'Licences à renouveler avant fin février:\n\n✅ CRM Pro - 25 licences\n⏳ Suite Office - 50 licences\n⏳ Antivirus - 30 licences\n⏳ Logiciel comptabilité\n\nBudget prévu: 12 000€\nContact fournisseur: tech@supplier.com',
    category: 'reminder',
    priority: 'medium',
    tags: ['licence', 'renouvellement', 'budget'],
    isPinned: false,
    userId: '3',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
];

export default function NotesGrid({ notes, onEditNote }: NotesGridProps) {
  const { deleteNote } = useAppStore();
  const displayNotes = notes.length > 0 ? notes : mockNotes;

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      deleteNote(noteId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayNotes.map((note, index) => {
        const priority = priorityConfig[note.priority];
        const category = categoryConfig[note.category];
        
        return (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onEditNote(note.id)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600"
          >
            {/* Pin Indicator */}
            {note.isPinned && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <i className="ri-pushpin-line text-white text-xs"></i>
              </motion.div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                  <i className={`${category.icon} ${category.color} text-sm`}></i>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.color}`}>
                  {priority.label}
                </span>
              </div>

              {/* Actions */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line text-sm"></i>
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    #{tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{note.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <i className="ri-folder-line"></i>
                <span>{category.label}</span>
              </div>
              <span>
                {new Date(note.updatedAt).toLocaleDateString('fr-FR')}
              </span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>
        );
      })}

      {/* Empty State */}
      {displayNotes.length === 0 && (
        <div className="col-span-full text-center py-12">
          <i className="ri-sticky-note-line text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune note trouvée. Créez votre première note !
          </p>
        </div>
      )}
    </div>
  );
}

/* Add to global styles for line-clamp utility */
const styles = `
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
`;

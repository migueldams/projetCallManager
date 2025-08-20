
import { create } from 'zustand';
import type { Call, TimeEntry, LeaveRequest, Note, Performance, Stock, FinancialReport, Candidate, ComplianceDocument } from '../types';

interface AppState {
  // États généraux
  isLoading: boolean;
  sidebarCollapsed: boolean;
  aiAssistantOpen: boolean;
  
  // Données
  calls: Call[];
  timeEntries: TimeEntry[];
  leaveRequests: LeaveRequest[];
  notes: Note[];
  performances: Performance[];
  stocks: Stock[];
  financialReports: FinancialReport[];
  candidates: Candidate[];
  complianceDocuments: ComplianceDocument[];
  
  // Actions
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  toggleAIAssistant: () => void;
  
  // CRUD Operations
  addCall: (call: Call) => void;
  updateCall: (id: string, updates: Partial<Call>) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  checkIn: (userId: string) => void;
  checkOut: (userId: string) => void;
  addLeaveRequest: (request: LeaveRequest) => void;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void;
}

// Données simulées étendues pour la démo
const mockCalls: Call[] = [
  {
    id: '1',
    agentId: '3',
    customerName: 'Jean Dupont',
    customerPhone: '+33123456789',
    campaign: 'Vente Premium',
    startTime: '2024-01-15T09:30:00',
    endTime: '2024-01-15T09:45:00',
    duration: 15,
    status: 'termine',
    outcome: 'Vente réalisée',
    notes: 'Client intéressé par l\'offre premium, signature prévue demain',
    tags: ['vente', 'premium', 'suivi'],
  },
  {
    id: '2',
    agentId: '3',
    customerName: 'Marie Leclerc',
    customerPhone: '+33987654321',
    campaign: 'Satisfaction Client',
    startTime: '2024-01-15T10:15:00',
    endTime: '2024-01-15T10:30:00',
    duration: 15,
    status: 'termine',
    outcome: 'Réclamation résolue',
    notes: 'Problème de facturation résolu, client satisfait',
    tags: ['satisfaction', 'resolu'],
  },
  {
    id: '3',
    agentId: '2',
    customerName: 'Pierre Martin',
    customerPhone: '+33456789123',
    campaign: 'Prospection B2B',
    startTime: '2024-01-20T14:20:00',
    endTime: '2024-01-20T14:45:00',
    duration: 25,
    status: 'termine',
    outcome: 'Rendez-vous fixé',
    notes: 'RDV commercial prévu le 25/01 à 14h',
    tags: ['prospect', 'b2b', 'rdv'],
  },
  {
    id: '4',
    agentId: '3',
    customerName: 'Sophie Durand',
    customerPhone: '+33789123456',
    campaign: 'Support Technique',
    startTime: '2024-01-20T11:00:00',
    endTime: '2024-01-20T11:20:00',
    duration: 20,
    status: 'termine',
    outcome: 'Problème résolu',
    notes: 'Assistance sur configuration logiciel, client autonome maintenant',
    tags: ['support', 'technique', 'resolu'],
  },
];

const mockTimeEntries: TimeEntry[] = [
  {
    id: 'time-1',
    userId: '3',
    checkIn: '2024-01-20T08:30:00',
    checkOut: '2024-01-20T17:30:00',
    date: '2024-01-20',
    duration: 540, // 9 heures
    status: 'present',
    notes: 'Journée complète',
  },
  {
    id: 'time-2',
    userId: '2',
    checkIn: '2024-01-20T09:00:00',
    checkOut: '2024-01-20T18:00:00',
    date: '2024-01-20',
    duration: 540,
    status: 'present',
  },
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-1',
    userId: '3',
    type: 'conge_paye',
    startDate: '2024-02-15',
    endDate: '2024-02-25',
    days: 8,
    reason: 'Vacances d\'hiver en famille',
    status: 'approved',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2024-01-12T14:30:00',
    approvedBy: '1',
    urgency: 'normal',
  },
  {
    id: 'leave-2',
    userId: '2',
    type: 'formation',
    startDate: '2024-02-05',
    endDate: '2024-02-07',
    days: 3,
    reason: 'Formation management d\'équipe',
    status: 'pending',
    createdAt: '2024-01-18T09:15:00',
    urgency: 'normal',
  },
];

const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Objectifs Q1 2024',
    content: 'Atteindre 150 ventes ce trimestre\n- Focus sur offres premium\n- Formation équipe sur nouvelles techniques\n- Améliorer taux de conversion',
    category: 'work',
    priority: 'high',
    tags: ['objectifs', 'ventes', 'Q1'],
    isPinned: true,
    userId: '2',
    createdAt: '2024-01-08T10:30:00',
    updatedAt: '2024-01-15T16:45:00',
  },
  {
    id: 'note-2',
    title: 'Idées amélioration CRM',
    content: 'Suggestions pour optimiser notre utilisation du CRM :\n\n1. Automatiser les relances clients\n2. Créer des templates d\'emails\n3. Intégrer avec le système de téléphonie\n4. Dashboard personnalisé par agent',
    category: 'idea',
    priority: 'medium',
    tags: ['crm', 'amélioration', 'productivité'],
    isPinned: false,
    userId: '3',
    createdAt: '2024-01-12T14:20:00',
    updatedAt: '2024-01-12T14:20:00',
  },
  {
    id: 'note-3',
    title: 'Réunion équipe - Points clés',
    content: 'Réunion du 18/01/2024 :\n\n✅ Nouveau processus de qualification\n✅ Objectifs individuels validés\n🔄 Formation sur objections clients prévue\n📋 Révision des scripts d\'appel',
    category: 'meeting',
    priority: 'medium',
    tags: ['réunion', 'équipe', 'processus'],
    isPinned: false,
    userId: '2',
    createdAt: '2024-01-18T11:00:00',
    updatedAt: '2024-01-18T11:00:00',
  },
];

const mockStocks: Stock[] = [
  {
    id: '1',
    name: 'Casques Bluetooth Pro',
    category: 'Équipement',
    quantity: 25,
    minThreshold: 10,
    price: 89.99,
    supplier: 'TechCorp',
    lastUpdate: '2024-01-15',
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Licences CRM',
    category: 'Logiciel',
    quantity: 5,
    minThreshold: 15,
    price: 199.00,
    supplier: 'SoftwareInc',
    lastUpdate: '2024-01-14',
    status: 'low_stock',
  },
  {
    id: '3',
    name: 'Ordinateurs portables',
    category: 'Matériel',
    quantity: 0,
    minThreshold: 3,
    price: 1299.99,
    supplier: 'Dell France',
    lastUpdate: '2024-01-10',
    status: 'out_of_stock',
  },
  {
    id: '4',
    name: 'Téléphones IP',
    category: 'Téléphonie',
    quantity: 18,
    minThreshold: 8,
    price: 125.50,
    supplier: 'Cisco Systems',
    lastUpdate: '2024-01-18',
    status: 'in_stock',
  },
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+33123456789',
    position: 'Agent Call Center Senior',
    status: 'interview',
    resume: 'CV_Sarah_Johnson.pdf',
    experience: 5,
    skills: ['Service client', 'CRM', 'Multilingue', 'Encadrement'],
    salary: 32000,
    createdAt: '2024-01-15T10:30:00',
    interviewDate: '2024-01-25T14:00:00',
    notes: 'Excellent profil, expérience solide en centre d\'appel',
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+33987654321',
    position: 'Superviseur Call Center',
    status: 'screening',
    experience: 8,
    skills: ['Leadership', 'Analyse', 'Formation', 'Qualité'],
    salary: 45000,
    createdAt: '2024-01-18T09:15:00',
    notes: 'Profil intéressant pour poste de supervision',
  },
];

const mockComplianceDocuments: ComplianceDocument[] = [
  {
    id: '1',
    name: 'Politique RGPD',
    type: 'gdpr',
    version: '2.1',
    status: 'active',
    content: 'Document de politique RGPD complet...',
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-15T10:30:00',
    approvedBy: '1',
  },
  {
    id: '2',
    name: 'Procédure Sécurité Données',
    type: 'procedure',
    version: '1.3',
    status: 'active',
    content: 'Procédures de sécurité des données...',
    createdAt: '2024-01-05T00:00:00',
    updatedAt: '2024-01-12T14:20:00',
    approvedBy: '2',
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  // États initiaux
  isLoading: false,
  sidebarCollapsed: false,
  aiAssistantOpen: false,
  
  // Données simulées étendues
  calls: mockCalls,
  timeEntries: mockTimeEntries,
  leaveRequests: mockLeaveRequests,
  notes: mockNotes,
  performances: [],
  stocks: mockStocks,
  financialReports: [],
  candidates: mockCandidates,
  complianceDocuments: mockComplianceDocuments,
  
  // Actions générales
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleAIAssistant: () => set((state) => ({ aiAssistantOpen: !state.aiAssistantOpen })),
  
  // CRUD Operations
  addCall: (call) => set((state) => ({ calls: [...state.calls, call] })),
  
  updateCall: (id, updates) => set((state) => ({
    calls: state.calls.map((call) => (call.id === id ? { ...call, ...updates } : call)),
  })),
  
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((note) => (note.id === id ? { ...note, ...updates } : note)),
  })),
  
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id),
  })),
  
  checkIn: (userId) => {
    const now = new Date();
    const entry: TimeEntry = {
      id: `time-${Date.now()}`,
      userId,
      checkIn: now.toISOString(),
      date: now.toISOString().split('T')[0],
      status: 'present',
    };
    set((state) => ({ timeEntries: [...state.timeEntries, entry] }));
  },
  
  checkOut: (userId) => {
    const now = new Date();
    set((state) => ({
      timeEntries: state.timeEntries.map((entry) =>
        entry.userId === userId && !entry.checkOut
          ? {
              ...entry,
              checkOut: now.toISOString(),
              duration: Math.round((now.getTime() - new Date(entry.checkIn).getTime()) / (1000 * 60)),
            }
          : entry
      ),
    }));
  },
  
  addLeaveRequest: (request) => set((state) => ({
    leaveRequests: [...state.leaveRequests, request],
  })),
  
  updateLeaveRequest: (id, updates) => set((state) => ({
    leaveRequests: state.leaveRequests.map((request) =>
      request.id === id ? { ...request, ...updates } : request
    ),
  })),
}));


export type UserRole = 'admin' | 'rh' | 'supervisor' | 'agent' | 'daf' | 'dg';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  department?: string;
  phoneNumber?: string;
}

export type CallStatus = 'en_cours' | 'termine' | 'annule' | 'rappel';

export interface Call {
  id: string;
  agentId: string;
  customerName: string;
  customerPhone: string;
  campaign: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: CallStatus;
  outcome: string;
  notes: string;
  tags: string[];
  recording?: string;
}

export type LeaveType = 'conge_paye' | 'conge_maladie' | 'conge_maternite' | 'conge_paternite' | 'formation' | 'personnel';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type LeaveUrgency = 'low' | 'normal' | 'high' | 'urgent';

export interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  updatedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  urgency: LeaveUrgency;
}

export interface TimeEntry {
  id: string;
  userId: string;
  checkIn: string;
  checkOut?: string;
  date: string;
  duration?: number; // in minutes
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes?: string;
}

export type NoteCategory = 'personal' | 'work' | 'project' | 'idea' | 'meeting' | 'reminder';
export type NotePriority = 'low' | 'medium' | 'high';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  priority: NotePriority;
  tags: string[];
  isPinned: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Performance {
  id: string;
  userId: string;
  period: string; // e.g., "2024-01" for monthly
  totalCalls: number;
  successfulCalls: number;
  totalDuration: number; // in minutes
  revenue: number;
  satisfactionScore: number;
  objectives: {
    calls: { target: number; achieved: number };
    sales: { target: number; achieved: number };
    revenue: { target: number; achieved: number };
  };
}

export interface Stock {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  price: number;
  supplier: string;
  lastUpdate: string;
  status?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface FinancialReport {
  id: string;
  period: string;
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  campaigns: {
    name: string;
    revenue: number;
    cost: number;
    roi: number;
  }[];
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface ComplianceDocument {
  id: string;
  name: string;
  type: 'gdpr' | 'policy' | 'procedure' | 'contract';
  version: string;
  status: 'draft' | 'active' | 'archived';
  content: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
}

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

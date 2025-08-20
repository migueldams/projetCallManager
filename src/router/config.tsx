
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import React from 'react';
import type { RouteObject } from 'react-router-dom';


// Pages
import LoginPage from '../pages/login/page';
import DashboardPage from '../pages/dashboard/page';
import CallsPage from '../pages/calls/page';
import TimeTrackingPage from '../pages/timetracking/page';
import PerformancePage from '../pages/performance/page';
import LeavesPage from '../pages/leaves/page';
import NotesPage from '../pages/notes/page';
import RecruitmentPage from '../pages/recruitment/page';
import FinancePage from '../pages/finance/page';
import InventoryPage from '../pages/inventory/page';
import UsersPage from '../pages/users/page';
import CompliancePage from '../pages/compliance/page';
import NotFound from '../pages/NotFound';
import Layout from '../components/layout/Layout';

// Route protection component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Public route component (redirect if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}


export const routes : RouteObject[] = [
  // Public route
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },

  // Protected routes wrapper
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'calls', element: <CallsPage /> },
      { path: 'timetracking', element: <TimeTrackingPage /> },
      { path: 'performance', element: <PerformancePage /> },
      { path: 'leaves', element: <LeavesPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'recruitment', element: <RecruitmentPage /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'compliance', element: <CompliancePage /> },
      {
    path: '*',
    element: (
      
        <NotFound />
      
    )
    }],
  },

  // 404 route
  
].filter(Boolean);

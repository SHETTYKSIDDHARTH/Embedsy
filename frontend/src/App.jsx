import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import Upload from './pages/Upload';
import Embed from './pages/Embed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Spinner from './components/common/Spinner';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return !user ? children : <Navigate to="/app/dashboard" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public landing page ── */}
      <Route path="/" element={<Landing />} />

      {/* ── Guest only ── */}
      <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

      {/* ── Protected app shell ── */}
      <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index                                  element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard"                       element={<Dashboard />} />
        <Route path="projects/:projectId"             element={<ProjectDetail />} />
        <Route path="projects/:projectId/upload"      element={<Upload />} />
        <Route path="projects/:projectId/embed"       element={<Embed />} />
      </Route>

      {/* Legacy redirect — keeps old /dashboard bookmark working */}
      <Route path="/dashboard" element={<ProtectedRoute><Navigate to="/app/dashboard" replace /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
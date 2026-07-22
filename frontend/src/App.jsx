import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturePage";
import LearningPage from "./pages/LearningPage";
import WorkforcePage from "./pages/WorkforcePage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StudentHome from "./pages/StudentHome";
import WorkforceDashboard from "./pages/WorkforceDashboard";
import WorkforceHome from "./pages/WorkforceHome";
import StudentFeatures from "./pages/StudentFeatures";
import WorkforceFeatures from "./pages/WorkforceFeatures";
import SandboxPage from "./pages/SandboxPage";
import CoursesPage from "./pages/CoursesPage";
import CertificatesPage from "./pages/CertificatesPage";
import DiscussionsPage from "./pages/DiscussionsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import ProgressPage from "./pages/ProgressPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import FloatingChatbot from "./components/FloatingChatbot";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAdmin } from "./context/AdminContext";

function AdminProtectedRoute({ children }) {
  const { isAdminAuth } = useAdmin();
  if (!isAdminAuth) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#05060b', color: '#00e5ff',
        fontFamily: 'Orbitron, sans-serif', fontSize: '16px'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/workforce-dashboard";

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/workforce" element={<WorkforcePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard/*" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

        {/* Protected routes */}
        {/* /dashboard redirects to student-home */}
        <Route path="/dashboard" element={<Navigate to="/student-home" replace />} />
        <Route path="/workforce-dashboard" element={<ProtectedRoute><WorkforceDashboard /></ProtectedRoute>} />
        <Route path="/student-home" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
        <Route path="/workforce-home" element={<ProtectedRoute><WorkforceHome /></ProtectedRoute>} />
        <Route path="/student-features" element={<ProtectedRoute><StudentFeatures /></ProtectedRoute>} />
        <Route path="/workforce-features" element={<ProtectedRoute><WorkforceFeatures /></ProtectedRoute>} />
        <Route path="/sandbox" element={<ProtectedRoute><SandboxPage /></ProtectedRoute>} />
        <Route path="/discussions" element={<ProtectedRoute><DiscussionsPage /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><ComingSoonPage title="Resources" /></ProtectedRoute>} />
        <Route path="/certificate" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      </Routes>
      {!isDashboardRoute && <FloatingChatbot />}
    </>
  );
}

export default App;

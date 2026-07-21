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
import StudentDashboard from "./pages/StudentDashboard";
import WorkforceDashboard from "./pages/WorkforceDashboard";
import StudentHome from "./pages/StudentHome";
import WorkforceHome from "./pages/WorkforceHome";
import StudentFeatures from "./pages/StudentFeatures";
import WorkforceFeatures from "./pages/WorkforceFeatures";
import SandboxPage from "./pages/SandboxPage";
import CoursesPage from "./pages/CoursesPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import FloatingChatbot from "./components/FloatingChatbot";

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
  const isDashboardRoute = location.pathname === "/dashboard" || location.pathname === "/workforce-dashboard";

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/workforce" element={<WorkforcePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/workforce-dashboard" element={<ProtectedRoute><WorkforceDashboard /></ProtectedRoute>} />
        <Route path="/student-home" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
        <Route path="/workforce-home" element={<ProtectedRoute><WorkforceHome /></ProtectedRoute>} />
        <Route path="/student-features" element={<ProtectedRoute><StudentFeatures /></ProtectedRoute>} />
        <Route path="/workforce-features" element={<ProtectedRoute><WorkforceFeatures /></ProtectedRoute>} />
        <Route path="/sandbox" element={<ProtectedRoute><SandboxPage /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/discussions" element={<ProtectedRoute><ComingSoonPage title="Discussions" /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><ComingSoonPage title="Resources" /></ProtectedRoute>} />
        <Route path="/certificate" element={<ProtectedRoute><ComingSoonPage title="Certificate" /></ProtectedRoute>} />
      </Routes>
      {!isDashboardRoute && <FloatingChatbot />}
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard" || location.pathname === "/workforce-dashboard";

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>


        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/workforce" element={<WorkforcePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/workforce-dashboard" element={<WorkforceDashboard />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/workforce-home" element={<WorkforceHome />} />
        <Route path="/student-features" element={<StudentFeatures />} />
        <Route path="/workforce-features" element={<WorkforceFeatures />} />
        <Route path="/sandbox" element={<SandboxPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/discussions" element={<ComingSoonPage title="Discussions" />} />
        <Route path="/resources" element={<ComingSoonPage title="Resources" />} />
        <Route path="/certificate" element={<ComingSoonPage title="Certificate" />} />
      </Routes>
      {!isDashboardRoute && <FloatingChatbot />}
    </>
  );
}

export default App;
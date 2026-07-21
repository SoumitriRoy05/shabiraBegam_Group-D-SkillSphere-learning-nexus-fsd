import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import Background from "../components/Background";
import "../styles/dashboard.css"; // Reuse dashboard layouts

export default function ComingSoonPage({ title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-page ${isSidebarOpen ? 'with-sidebar' : ''}`}>
      <Background />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={true} 
      />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="dashboard-content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', background: 'rgba(18, 18, 30, 0.65)', padding: '60px', borderRadius: '20px', border: '1px solid rgba(0, 229, 255, 0.15)', backdropFilter: 'blur(12px)' }}>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '48px', color: '#00e5ff', marginBottom: '20px' }}>{title}</h1>
          <h2 style={{ fontSize: '28px', color: '#ffffff', marginBottom: '15px' }}>Coming Soon</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '400px', margin: '0 auto' }}>
            We're working hard to bring you this feature. Check back later for updates!
          </p>
        </div>
      </main>
    </div>
  );
}

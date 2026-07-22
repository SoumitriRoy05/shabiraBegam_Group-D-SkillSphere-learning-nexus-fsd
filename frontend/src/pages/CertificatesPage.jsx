import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/dashboard.css";

export default function CertificatesPage() {
  const { user, completedTopics } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getCompletedCountForCert = (trackKey) => {
    if (!completedTopics) return 0;
    return completedTopics.filter(id => id.startsWith(`${trackKey}_`)).length;
  };

  const certificatesList = [
    {
      id: "CERT-REACT-8942",
      title: "React Web Architecture & Masterclass",
      courseName: "React Developer",
      trackKey: "react",
      date: "2026-07-15",
      color: "#00e5ff"
    },
    {
      id: "CERT-JAVA-3310",
      title: "Core Java OOPs & Enterprise Systems",
      courseName: "Java Master",
      trackKey: "java",
      date: "2026-07-18",
      color: "#f97316"
    },
    {
      id: "CERT-SPRING-7721",
      title: "Spring Boot Microservices & Security",
      courseName: "Spring Boot Pro",
      trackKey: "springboot",
      date: "2026-07-20",
      color: "#22c55e"
    },
    {
      id: "CERT-FSD-1092",
      title: "Frontend System Design & Scalability",
      courseName: "Frontend System Design",
      trackKey: "fsd",
      date: "2026-07-21",
      color: "#8a2eff"
    },
    {
      id: "CERT-JS-5541",
      title: "Modern JavaScript Ninja & ES6+",
      courseName: "JavaScript",
      trackKey: "javascript",
      date: "2026-07-21",
      color: "#facc15"
    }
  ];

  const [previewedCert, setPreviewedCert] = useState(certificatesList[0]);
  const [downloadModalInfo, setDownloadModalInfo] = useState(null);
  const canvasRef = useRef(null);

  const handleDownloadCertificate = (cert) => {
    const completedCount = getCompletedCountForCert(cert.trackKey);

    if (completedCount < 6) {
      setDownloadModalInfo({
        status: "LOCKED",
        title: `🔒 Certificate Locked (${completedCount} / 6 Modules Completed)`,
        body: `You have completed ${completedCount} out of 6 curriculum modules for ${cert.courseName}. Please finish all 6 modules and pass the track assessment in the Learning Portal to unlock and download your official PNG certificate!`,
        trackKey: cert.trackKey,
        courseName: cert.courseName
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Canvas background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, 1000, 700);

    // Certificate border
    ctx.strokeStyle = cert.color || "#00e5ff";
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 960, 660);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 930, 630);

    // SkillSphere logo
    ctx.fillStyle = cert.color || "#00e5ff";
    ctx.font = "bold 32px Rajdhani, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⬢ SKILLSPHERE ACADEMY", 500, 100);

    // Title
    ctx.fillStyle = "var(--text-primary)";
    ctx.font = "bold 28px Orbitron, sans-serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", 500, 170);

    ctx.fillStyle = "var(--text-secondary)";
    ctx.font = "18px Rajdhani, sans-serif";
    ctx.fillText("This official credential certifies that", 500, 240);

    // Student Name
    const name = user?.full_name || user?.username || "SkillSphere Graduate";
    ctx.fillStyle = cert.color || "#00e5ff";
    ctx.font = "bold 38px Orbitron, sans-serif";
    ctx.fillText(name, 500, 310);

    // Body
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "18px Rajdhani, sans-serif";
    ctx.fillText(`has successfully mastered all requirements and chapters for`, 500, 370);

    ctx.fillStyle = "var(--text-primary)";
    ctx.font = "bold 24px Orbitron, sans-serif";
    ctx.fillText(cert.title, 500, 420);

    // Verification Hash & Date
    ctx.fillStyle = "#64748b";
    ctx.font = "14px monospace";
    ctx.fillText(`Verification ID: ${cert.id} • Issued: ${cert.date}`, 500, 520);

    // Stamp Seal
    ctx.beginPath();
    ctx.arc(500, 590, 35, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 229, 255, 0.15)";
    ctx.fill();
    ctx.strokeStyle = cert.color || "#00e5ff";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = cert.color || "#00e5ff";
    ctx.font = "bold 12px Orbitron, sans-serif";
    ctx.fillText("VERIFIED", 500, 594);

    // Download trigger
    const link = document.createElement("a");
    link.download = `SkillSphere_${cert.courseName.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Trigger Success Completion Popup Modal
    setDownloadModalInfo({
      status: "SUCCESS",
      title: `🎓 Congratulations on Completing All 6 Modules!`,
      body: `You have completed all 6 curriculum modules for ${cert.courseName}! Your official SkillSphere Verified Certificate (ID: ${cert.id}) has been generated and downloaded to your device.`,
      trackKey: cert.trackKey,
      courseName: cert.courseName
    });
  };

  return (
    <div className={`dashboard-page ${isSidebarOpen ? 'with-sidebar' : ''}`} style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Background />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={true} 
      />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="dashboard-container" style={{ maxWidth: '1250px', margin: '0 auto', padding: '110px 24px 60px 24px' }}>
        
        {/* Header */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', color: '#00e5ff', marginBottom: '10px' }}>
            📜 Official Verified Certificates
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '650px', margin: '0 auto' }}>
            View, verify, and download high-resolution PNG certificates for all your completed SkillSphere learning tracks.
          </p>
        </section>

        {/* Certificates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '40px' }}>
          {certificatesList.map(cert => (
            <div 
              key={cert.id} 
              style={{
                background: 'var(--bg-panel)',
                border: `1px solid ${cert.color || 'var(--border-color)'}`,
                borderRadius: '16px',
                padding: '25px',
                boxShadow: 'var(--shadow-panel)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: cert.color, textTransform: 'uppercase', fontFamily: 'Orbitron, sans-serif' }}>
                    {cert.courseName}
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '3px 10px', borderRadius: '12px', fontWeight: '700' }}>
                    ✓ Verified Hash
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' }}>
                  {cert.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace', marginBottom: '20px' }}>
                  ID: {cert.id} • Issued: {cert.date}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPreviewedCert(cert)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  👁 View Modal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewedCert(cert);
                    setTimeout(() => handleDownloadCertificate(cert), 100);
                  }}
                  style={{
                    flex: 1,
                    background: `linear-gradient(90deg, ${cert.color}, #8a2eff)`,
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: `0 0 15px ${cert.color}40`
                  }}
                >
                  📥 Download PNG
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Visual Demo Preview Document */}
        {previewedCert && (
          <section style={{ marginTop: '35px' }}>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#00e5ff', fontSize: '20px', marginBottom: '16px', textAlign: 'center' }}>
              📜 Interactive Certificate Diploma Preview
            </h3>

            {/* Visual Certificate Paper Document Graphic */}
            <div style={{
              background: 'var(--bg-card)',
              border: `6px double ${previewedCert.color}`,
              borderRadius: '16px',
              padding: '50px 40px',
              textAlign: 'center',
              boxShadow: `0 0 50px ${previewedCert.color}40`,
              position: 'relative',
              maxWidth: '900px',
              margin: '0 auto 30px auto',
              overflow: 'hidden'
            }}>
              {/* Decorative Corner Ornaments */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', width: '30px', height: '30px', borderTop: `3px solid ${previewedCert.color}`, borderLeft: `3px solid ${previewedCert.color}` }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px', borderTop: `3px solid ${previewedCert.color}`, borderRight: `3px solid ${previewedCert.color}` }} />
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '30px', height: '30px', borderBottom: `3px solid ${previewedCert.color}`, borderLeft: `3px solid ${previewedCert.color}` }} />
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '30px', height: '30px', borderBottom: `3px solid ${previewedCert.color}`, borderRight: `3px solid ${previewedCert.color}` }} />

              {/* Institution Header */}
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: '800', fontSize: '22px', color: previewedCert.color, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>
                ⬢ SKILLSPHERE ACADEMY OF TECHNOLOGY
              </div>

              {/* Title */}
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '32px', color: 'var(--text-primary)', letterSpacing: '2px', margin: '0 0 15px 0', textTransform: 'uppercase' }}>
                Certificate of Completion
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', margin: '0 0 20px 0', fontStyle: 'italic' }}>
                This official credential certifies that
              </p>

              {/* Graduate Name */}
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', fontWeight: '800', color: previewedCert.color, marginBottom: '20px', textShadow: `0 0 15px ${previewedCert.color}50` }}>
                {user?.full_name || user?.username || "SkillSphere Graduate"}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '650px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                has successfully mastered all 6 curriculum modules, reference guides, and final track assessments for
              </p>

              {/* Course Title */}
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '30px' }}>
                {previewedCert.title}
              </div>

              {/* Seal and Signatures Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', padding: '0 30px', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '18px', fontStyle: 'italic', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', width: '160px' }}>
                    Alexis Mangin
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>Director of Curriculum</span>
                </div>

                {/* Verified Gold Seal */}
                <div style={{
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${previewedCert.color}20, var(--bg-primary))`,
                  border: `3px double ${previewedCert.color}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 20px ${previewedCert.color}40`
                }}>
                  <span style={{ fontSize: '22px' }}>🏅</span>
                  <span style={{ fontSize: '10px', color: previewedCert.color, fontWeight: '800', fontFamily: 'Orbitron, sans-serif' }}>VERIFIED</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '18px', fontStyle: 'italic', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', width: '160px' }}>
                    SphereAI Engine
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>Verification Authority</span>
                </div>
              </div>

              {/* Hash ID */}
              <div style={{ marginTop: '30px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                VERIFICATION ID: <span style={{ color: '#00e5ff' }}>{previewedCert.id}</span> • ISSUED: {previewedCert.date}
              </div>
            </div>

            {/* Action Download Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => handleDownloadCertificate(previewedCert)}
                style={{
                  background: `linear-gradient(90deg, ${previewedCert.color}, #8a2eff)`,
                  color: 'var(--text-primary)',
                  border: 'none',
                  padding: '16px 42px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: `0 0 30px ${previewedCert.color}50`
                }}
              >
                📥 Download High-Resolution Certificate (.PNG)
              </button>
            </div>
          </section>
        )}

        {/* Hidden Canvas for PNG Generation */}
        <canvas ref={canvasRef} width={1000} height={700} style={{ display: 'none' }} />

        {/* Download Modal: Success vs Locked */}
        {downloadModalInfo && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              background: 'var(--bg-panel)',
              border: downloadModalInfo.status === "SUCCESS" ? '2px solid #00e5ff' : '2px solid #ef4444',
              borderRadius: '24px',
              padding: '40px 30px',
              maxWidth: '540px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow-panel)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '15px' }}>
                {downloadModalInfo.status === "SUCCESS" ? "🎉🎓" : "🔒⚠️"}
              </div>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: downloadModalInfo.status === "SUCCESS" ? '#00e5ff' : '#ef4444', fontSize: '24px', marginBottom: '14px' }}>
                {downloadModalInfo.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
                {downloadModalInfo.body}
              </p>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {downloadModalInfo.status === "LOCKED" ? (
                  <button
                    type="button"
                    onClick={() => {
                      const tk = downloadModalInfo.trackKey;
                      setDownloadModalInfo(null);
                      navigate(`/learning?track=${tk}`);
                    }}
                    style={{
                      background: 'linear-gradient(90deg, #ef4444, #f97316)',
                      color: 'var(--text-primary)',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '30px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    📖 Go to Learning Portal to Complete 6 Modules ↗
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setDownloadModalInfo(null)}
                  style={{
                    background: downloadModalInfo.status === "SUCCESS" ? 'linear-gradient(90deg, #00e5ff, #8a2eff)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 28px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Close ✖
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

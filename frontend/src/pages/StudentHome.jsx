import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import "../styles/studentHome.css";

export default function StudentHome() {
  const { user, xp, earnXp, completedTopics } = useAuth();
  const navigate = useNavigate();

  // Dynamic state for mock gamification
  const [streak, setStreak] = useState(7);
  const [claimedQuests, setClaimedQuests] = useState({});

  const handleClaimQuest = (questId, questXp) => {
    if (claimedQuests[questId]) return;
    setClaimedQuests(prev => ({ ...prev, [questId]: true }));
    earnXp(questXp);
  };

  // Dynamic Active Courses aligned with learning curriculum portal
  const reactCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('react_')).length : 0;
  const javaCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('java_')).length : 0;
  const springbootCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('springboot_')).length : 0;

  // Level is computed based on completed modules (completing 1 entire module moves to Level 1)
  const completedModulesCount = 
    (reactCompleted >= 6 ? 1 : 0) + 
    (javaCompleted >= 6 ? 1 : 0) + 
    (springbootCompleted >= 6 ? 1 : 0);
  const level = completedModulesCount;

  const activeCourses = [
    { id: "react", title: "React Development", category: "Frontend Dev", progress: Math.round((reactCompleted / 6) * 100), hours: `${reactCompleted} / 6 Chapters` },
    { id: "java", title: "Java OOPs", category: "Core Java", progress: Math.round((javaCompleted / 6) * 100), hours: `${javaCompleted} / 6 Chapters` },
    { id: "springboot", title: "Spring Boot Microservices", category: "Backend Dev", progress: Math.round((springbootCompleted / 6) * 100), hours: `${springbootCompleted} / 6 Chapters` }
  ];

  // Daily Quests
  const dailyQuests = [
    { id: "q1", title: "Complete 1 React Module", rewardXp: 150 },
    { id: "q2", title: "Maintain study streak", rewardXp: 100 }
  ];

  return (
    <div className="student-home-page">
      <Background />
      <Navbar />

      <main className="student-home-content">
        
        {/* Futuristic Welcome Header */}
        <section className="sh-welcome-banner">
          <div className="sh-banner-content">
            <div className="sh-banner-text">
              <h1>Welcome Back, {user?.full_name || user?.username || "Learner"}!</h1>
              <p>Ready to push your skill limits? You have active modules waiting. Resume study to maintain your streak and level up your cyber-credentials!</p>
            </div>
            
            {/* Quick Stats Matrix */}
            <div className="sh-status-matrix">
              <div className="sh-matrix-item">
                <span className="sh-matrix-icon">⚡</span>
                <div className="sh-matrix-info">
                  <span className="sh-matrix-label">Current XP</span>
                  <span className="sh-matrix-value">{xp} XP</span>
                </div>
              </div>
              <div className="sh-matrix-item">
                <span className="sh-matrix-icon">🏆</span>
                <div className="sh-matrix-info">
                  <span className="sh-matrix-label">Active Level</span>
                  <span className="sh-matrix-value">Lvl {level}</span>
                </div>
              </div>
              <div className="sh-matrix-item">
                <span className="sh-matrix-icon">🔥</span>
                <div className="sh-matrix-info">
                  <span className="sh-matrix-label">Daily Streak</span>
                  <span className="sh-matrix-value">{streak} Days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home Workspace Columns */}
        <div className="sh-grid-layout">
          
          {/* Main Column */}
          <div className="sh-main-col">
            
            {/* Active Learning Hub */}
            <div className="sh-panel">
              <div className="sh-panel-header">
                <h3 className="sh-panel-title">Active <span>Learning Hub</span></h3>
                <button className="sh-feed-btn" onClick={() => navigate('/courses')} style={{ background: 'transparent', border: '1px solid #00e5ff', color: '#00e5ff', padding: '8px 16px' }}>
                  Explore Courses
                </button>
              </div>

              <div className="sh-learning-feed">
                {activeCourses.map(course => (
                  <div key={course.id} className="sh-feed-card">
                    <div className="sh-feed-details">
                      <span className="course-category" style={{ fontSize: '13px' }}>{course.category}</span>
                      <h4>{course.title}</h4>
                      <div className="sh-feed-meta">
                        <span>Duration: <span className="highlight">{course.hours}</span></span>
                        <span>Status: <span className="highlight">Active Progress</span></span>
                      </div>
                      <div className="sh-feed-progress">
                        <div className="sh-progress-track">
                          <div className="sh-progress-fill" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span className="sh-progress-val">{course.progress}%</span>
                      </div>
                    </div>
                    <button className="sh-feed-btn" onClick={() => navigate('/dashboard')}>
                      Resume Study
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Matrix Shortcuts */}
            <div className="sh-panel">
              <div className="sh-panel-header">
                <h3 className="sh-panel-title">Portal <span>Quick Navigation</span></h3>
              </div>
              <div className="sh-shortcuts-grid">
                <div className="sh-shortcut-card" onClick={() => navigate('/student-home')}>
                  <span className="sh-shortcut-icon">⬢</span>
                  <h4>Home</h4>
                  <p>Return to your student dashboard workspace console homepage</p>
                </div>
                <div className="sh-shortcut-card" onClick={() => navigate('/student-features')}>
                  <span className="sh-shortcut-icon">🚀</span>
                  <h4>Features</h4>
                  <p>Explore tools designed to gamify your learning and track achievements</p>
                </div>
                <div className="sh-shortcut-card" onClick={() => navigate('/learning')}>
                  <span className="sh-shortcut-icon">📚</span>
                  <h4>Learning</h4>
                  <p>Access interactive modules in React, Java, and Spring Boot</p>
                </div>
                <div className="sh-shortcut-card" onClick={() => navigate('/dashboard')}>
                  <span className="sh-shortcut-icon">📊</span>
                  <h4>Dashboard</h4>
                  <p>Check your progress, verify certificates, and view leaderboards</p>
                </div>
              </div>
            </div>

            {/* Trending & New Courses Showcase */}
            <div className="sh-panel" style={{ marginTop: '25px' }}>
              <div className="sh-panel-header">
                <h3 className="sh-panel-title">Explore <span>Trending & New Courses</span></h3>
                <button className="sh-feed-btn" onClick={() => navigate('/courses')} style={{ background: 'transparent', border: '1px solid #00e5ff', color: '#00e5ff', padding: '8px 16px' }}>
                  View All 12 Courses ↗
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginTop: '15px' }}>
                {[
                  { id: 1, title: "Frontend System Design", badge: "Premium", track: "react", desc: "Master large-scale application architecture and frontend performance optimization." },
                  { id: 4, title: "Data Structures & Algorithms (DSA)", badge: "FAANG Prep", track: "java", desc: "bootcamp: Arrays, Trees, Dynamic Programming, and Graph algorithms." },
                  { id: 5, title: "Generative AI Engineering", badge: "New Track", track: "react", desc: "Build LLM applications, RAG pipelines, and integrate AI into software." },
                  { id: 7, title: "Advanced Node.js & Microservices", badge: "Popular", track: "springboot", desc: "Scale backend systems with Docker, Kubernetes, and event-driven microservices." }
                ].map(c => (
                  <div key={c.id} style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'transform 0.2s'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: '700', background: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff', padding: '3px 8px', borderRadius: '10px' }}>
                        {c.badge}
                      </span>
                      <h4 style={{ color: '#ffffff', margin: '10px 0 6px 0', fontSize: '16px' }}>{c.title}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>{c.desc}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/learning?track=${c.track}`)}
                      style={{
                        marginTop: '15px',
                        background: 'linear-gradient(90deg, #00e5ff, #8a2be2)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Explore Course ↗
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="sh-side-col">
            
            {/* Daily Quests / Missions */}
            <div className="sh-panel">
              <div className="sh-panel-header">
                <h3 className="sh-panel-title">Daily <span>Missions</span></h3>
              </div>
              <div className="sh-mission-list">
                {dailyQuests.map(quest => (
                  <div key={quest.id} className="sh-mission-card">
                    <div className="sh-mission-details">
                      <h5>{quest.title}</h5>
                      <span className="sh-mission-xp">+{quest.rewardXp} XP</span>
                    </div>
                    {claimedQuests[quest.id] ? (
                      <button className="sh-mission-btn-claim completed" disabled>
                        Claimed
                      </button>
                    ) : (
                      <button className="sh-mission-btn-claim" onClick={() => handleClaimQuest(quest.id, quest.rewardXp)}>
                        Claim
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SphereAI Advisor console quick note */}
            <div className="sh-panel" style={{ border: '1px dashed rgba(0, 229, 255, 0.2)' }}>
              <div className="sh-panel-header">
                <h3 className="sh-panel-title">SphereAI <span>Advisor</span></h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5', marginBottom: '15px' }}>
                Need learning suggestions or career tips? Click the floating advisor button 🤖 in the bottom right corner of the page to launch a live interactive query console!
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '11px', background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0, 229, 255, 0.15)' }}>#CareerAdvice</span>
                <span style={{ fontSize: '11px', background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0, 229, 255, 0.15)' }}>#StudyPath</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

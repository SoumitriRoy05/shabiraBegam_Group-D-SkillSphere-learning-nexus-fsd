import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const { user, xp, earnXp, completedTopics } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const reactCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('react_')).length : 0;
  const javaCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('java_')).length : 0;
  const springbootCompleted = completedTopics ? completedTopics.filter(id => id.startsWith('springboot_')).length : 0;

  const completedModulesCount = 
    (reactCompleted >= 6 ? 1 : 0) + 
    (javaCompleted >= 6 ? 1 : 0) + 
    (springbootCompleted >= 6 ? 1 : 0);
  const level = completedModulesCount;

  const xpNeededForNextLevel = 2000;
  const currentLevelProgress = xp % 2000;

  const courses = [
    { id: "react", title: "React Development", category: "Frontend Dev", progress: Math.round((reactCompleted / 6) * 100), color: "#00e5ff" },
    { id: "java", title: "Java OOPs", category: "Core Java", progress: Math.round((javaCompleted / 6) * 100), color: "#f97316" },
    { id: "springboot", title: "Spring Boot Microservices", category: "Backend Dev", progress: Math.round((springbootCompleted / 6) * 100), color: "#22c55e" }
  ];

  // Quests & Challenges
  const [quests, setQuests] = useState([
    { id: 1, title: "Log in and maintain your daily streak", xpReward: 50, status: "COMPLETED" },
    { id: 2, title: "Complete the React architecture practice quiz", xpReward: 150, status: "CLAIMABLE" },
    { id: 3, title: "Solve the Spring Boot security challenge", xpReward: 200, status: "IN_PROGRESS" }
  ]);

  const [previewedCert, setPreviewedCert] = useState(null);

  // Leaderboard data (dynamic based on student's XP)
  const initialLeaderboard = [
    { rank: 1, username: "CypherLearner", xp: 3500, isSelf: false },
    { rank: 2, username: "NeonCoder", xp: 2900, isSelf: false },
    { rank: 3, username: "ByteKnight", xp: 2600, isSelf: false },
    { rank: 4, username: "You", xp: 2450, isSelf: true },
    { rank: 5, username: "PixelPioneer", xp: 2100, isSelf: false },
    { rank: 6, username: "SynthGuru", xp: 1800, isSelf: false }
  ];
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  // Sync leaderboard when student XP changes
  useEffect(() => {
    const updated = initialLeaderboard.map(member => 
      member.isSelf ? { ...member, xp: xp } : member
    );
    // Re-sort leaderboard by XP descending and re-assign ranks
    updated.sort((a, b) => b.xp - a.xp);
    const ranked = updated.map((item, idx) => ({ ...item, rank: idx + 1 }));
    setLeaderboard(ranked);
  }, [xp]);

  const handleDownloadCertificate = (cert) => {
    // Create a canvas element dynamically
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext("2d");

    // Draw dark background gradient
    const grad = ctx.createLinearGradient(0, 0, 1000, 700);
    grad.addColorStop(0, "#0d0f19");
    grad.addColorStop(1, "#05060b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1000, 700);

    // Draw ambient glows (radial gradients)
    const radGrad1 = ctx.createRadialGradient(100, 100, 50, 100, 100, 300);
    radGrad1.addColorStop(0, "rgba(0, 229, 255, 0.15)");
    radGrad1.addColorStop(1, "rgba(0, 229, 255, 0)");
    ctx.fillStyle = radGrad1;
    ctx.fillRect(0, 0, 1000, 700);

    const radGrad2 = ctx.createRadialGradient(900, 600, 50, 900, 600, 300);
    radGrad2.addColorStop(0, "rgba(255, 0, 200, 0.15)");
    radGrad2.addColorStop(1, "rgba(255, 0, 200, 0)");
    ctx.fillStyle = radGrad2;
    ctx.fillRect(0, 0, 1000, 700);

    // Draw outer cyan border
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 960, 660);

    // Draw inner dashed border
    ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.strokeRect(40, 40, 920, 620);
    ctx.setLineDash([]); // Reset dashed state

    // Draw SkillSphere logo ⬢
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⬢", 500, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("SkillSphere", 500, 145);

    // Certificate Header
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", 500, 215);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("THIS IS PROUDLY PRESENTED TO", 500, 265);

    // Student Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px sans-serif";
    const name = user?.full_name || user?.username || "SkillSphere Graduate";
    ctx.fillText(name, 500, 335);

    // Underline name
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 355);
    ctx.lineTo(700, 355);
    ctx.stroke();

    // Course Title
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "18px sans-serif";
    ctx.fillText("for successfully mastering the core modules, study tracks, and final checkpoints for", 500, 400);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(cert.title, 500, 440);

    // Footer - Date of Issue
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("DATE OF ISSUE", 100, 535);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(cert.date, 100, 565);

    // Footer - Verification ID
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("VERIFICATION ID", 900, 535);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px monospace";
    ctx.fillText(cert.id, 900, 565);

    
    ctx.fillStyle = "#00e5ff";
    ctx.font = "40px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🏆", 500, 555);

  
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `SkillSphere_Certificate_${cert.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const languageTemplates = {
    python: `# Python 3 execution sandbox\ndef greet(name):\n    return f"Hello, {name}! Welcome to SkillSphere."\n\nprint(greet("Student"))`,
    cpp: `// C++ execution sandbox\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++ compiler!" << endl;\n    return 0;\n}`,
    c: `// C execution sandbox\n#include <stdio.h>\n\nint main() {\n    printf("Hello from C compiler!\\n");\n    return 0;\n}`,
    java: `// Java execution sandbox\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java compiler!");\n    }\n}`
  };

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [editorCode, setEditorCode] = useState(languageTemplates.python);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setEditorCode(languageTemplates[lang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Compiling and executing code...");

    setTimeout(() => {
      let output = "";
      const code = editorCode;

      if (selectedLanguage === "python") {
        const printRegex = /print\((['"])(.*?)\1\)/g;
        let match;
        const matches = [];
        while ((match = printRegex.exec(code)) !== null) {
          matches.push(match[2]);
        }
        if (matches.length > 0) {
          output = matches.join("\n");
        } else {
          output = "Process exited with code 0 (No output produced).";
        }
      } else if (selectedLanguage === "cpp") {
        const coutRegex = /cout\s*<<\s*(['"])(.*?)\1/g;
        let match;
        const matches = [];
        while ((match = coutRegex.exec(code)) !== null) {
          matches.push(match[2]);
        }
        if (matches.length > 0) {
          output = matches.join("\n");
        } else {
          output = "Process exited with code 0 (No output produced).";
        }
      } else if (selectedLanguage === "c") {
        const printfRegex = /printf\((['"])(.*?)\\n?\1\)/g;
        let match;
        const matches = [];
        while ((match = printfRegex.exec(code)) !== null) {
          matches.push(match[2]);
        }
        if (matches.length > 0) {
          output = matches.join("\n");
        } else {
          output = "Process exited with code 0 (No output produced).";
        }
      } else if (selectedLanguage === "java") {
        const javaRegex = /System\.out\.println\((['"])(.*?)\1\)/g;
        let match;
        const matches = [];
        while ((match = javaRegex.exec(code)) !== null) {
          matches.push(match[2]);
        }
        if (matches.length > 0) {
          output = matches.join("\n");
        } else {
          output = "Process exited with code 0 (No output produced).";
        }
      }

      setConsoleOutput(output);
      setIsRunning(false);
    }, 1000);
  };

  // AI Mentor state
  const [chatMessages, setChatMessages] = useState([
    { sender: "assistant", text: "Greetings! I am SphereAI, your learning assistant. Ask me anything about course requirements, career guidance, or how to unlock achievements." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  // Action: Redirect to learning portal to allow actual GFG-style study
  const handleStudy = (courseId) => {
    navigate('/learning', { state: { activeTrack: courseId } });
  };

  // Action: Claim Quest Rewards
  const handleClaimReward = (questId, reward) => {
    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, status: "COMPLETED" } : q
    ));
    handleEarnXp(reward);
  };

  const handleEarnXp = (amount) => {
    earnXp(amount);
  };

  // Action: Interactive Chat Submit
  const handleSendChat = async (text) => {
    if (!text.trim() || isChatLoading) return;

    // Add user message
    const updatedMessages = [...chatMessages, { sender: "user", text }];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsChatLoading(true);

    const systemPrompt = `You are SphereAI, the virtual learning mentor and programming expert for this student. You are highly knowledgeable in Python, C++, C, Java, React, Spring Boot, Cybersecurity, Machine Learning, and general science/career topics. The student is currently at Level: ${level}, XP: ${xp}, Streak: 7 Days. Feel free to provide comprehensive explanations, structural code snippets, and complete step-by-step guides when they ask technical or learning questions. Always maintain a supportive, encouraging, and expert cyber-mentor tone.`;

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...chatMessages.slice(-6).map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: text }
          ],
          model: "openai"
        })
      });

      if (!response.ok) throw new Error("API failed");
      const replyText = await response.text();
      setChatMessages(prev => [...prev, { sender: "assistant", text: replyText.trim() }]);
    } catch (err) {
      console.warn("AI Chat API error, falling back to local responses:", err);
      // Simulate local response fallback
      setTimeout(() => {
        let reply = "I am here to guide you! Feel free to ask about any coding concept in React, Java, Spring Boot, Python, C, C++, or dashboard achievements.";
        const cleanText = text.toLowerCase();

        if (cleanText.includes("xp") || cleanText.includes("level")) {
          reply = "You can earn XP by studying courses (click 'Study' to progress +5%) and completing daily challenges under the 'Quests' panel. Completing an entire course module advances you to the next Level!";
        } else if (cleanText.includes("badge") || cleanText.includes("streak") || cleanText.includes("quiz")) {
          reply = "Achievements represent milestones. Unlock master badges by scoring 85%+ on final track challenges, or log in daily to maintain your study streak!";
        } else if (cleanText.includes("cert")) {
          reply = "Upon completing any course track, a secure verification hash is generated. You can copy the certificate ID from the 'Certificates' tab to share on your resume.";
        } else if (cleanText.includes("react")) {
          reply = "React is a component-based UI library. It utilizes a Virtual DOM for fast, dynamic updates. Here is a simple functional component:\n\n```jsx\nfunction Welcome() {\n  return <h1>Hello SkillSphere!</h1>;\n}\n```";
        } else if (cleanText.includes("spring boot") || cleanText.includes("springboot")) {
          reply = "Spring Boot makes it easy to create stand-alone, production-grade Spring applications. It uses auto-configuration and starter dependencies to deploy fast API microservices.";
        } else if (cleanText.includes("java")) {
          reply = "Java is a popular, robust, class-based object-oriented language. Example class:\n\n```java\npublic class Greeter {\n  public void sayHello() {\n    System.out.println(\"Hello OOP!\");\n  }\n}\n```";
        } else if (cleanText.includes("python")) {
          reply = "Python is a clean, interpreted language optimized for readability. It is popular for automation, scripting, and machine learning. Example:\n\n```python\nprint([x**2 for x in range(5)])  # List comprehension\n```";
        } else if (cleanText.includes("c++") || cleanText.includes("cpp")) {
          reply = "C++ is a high-performance,Compiled language extending C with classes. It is perfect for system software, gaming, and performance-critical systems.";
        } else if (cleanText.includes("c")) {
          reply = "C is a foundational procedural programming language. It offers low-level memory control via pointers and compiling efficiency, powering operating system kernels.";
        } else if (cleanText.includes("career") || cleanText.includes("recommend") || cleanText.includes("course")) {
          reply = "Based on your active progress, I highly recommend completing the 'React Development' track first, followed by 'Spring Boot' to build a solid full-stack foundation!";
        }
        setChatMessages(prev => [...prev, { sender: "assistant", text: reply }]);
      }, 600);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Pre-defined quick chat prompts
  const quickPrompts = [
    "How do I level up fast?",
    "Tell me about certificates.",
    "Recommend my next course."
  ];

  // Dynamic checks for GFG track quiz master badges
  const isReactBadgeUnlocked = user && localStorage.getItem(`badge_react_badge_${user.email || user.username}`) === "true";
  const isJavaBadgeUnlocked = user && localStorage.getItem(`badge_java_badge_${user.email || user.username}`) === "true";
  const isSpringBootBadgeUnlocked = user && localStorage.getItem(`badge_springboot_badge_${user.email || user.username}`) === "true";
  const isAiBadgeUnlocked = user && localStorage.getItem(`badge_ai_badge_${user.email || user.username}`) === "true";
  const isDsaBadgeUnlocked = user && localStorage.getItem(`badge_dsa_badge_${user.email || user.username}`) === "true";
  const isPythonBadgeUnlocked = user && localStorage.getItem(`badge_python_badge_${user.email || user.username}`) === "true";
  const isWebDevBadgeUnlocked = user && localStorage.getItem(`badge_webdev_badge_${user.email || user.username}`) === "true";
  const isCyberBadgeUnlocked = user && localStorage.getItem(`badge_cyber_badge_${user.email || user.username}`) === "true";
  const isCloudBadgeUnlocked = user && localStorage.getItem(`badge_cloud_badge_${user.email || user.username}`) === "true";
  const isDbmsBadgeUnlocked = user && localStorage.getItem(`badge_dbms_badge_${user.email || user.username}`) === "true";

  // Mock Badges list with dynamic course badges
  const badgesList = [
    { name: "🔥 Daily Streak", desc: "Logged in 5 days straight", unlocked: true, icon: "🔥" },
    { name: "⚛️ React Master", desc: "Scored 85%+ on React Quiz Challenge", unlocked: !!isReactBadgeUnlocked, icon: "⚛️" },
    { name: "☕ Java Master", desc: "Scored 85%+ on Java Quiz Challenge", unlocked: !!isJavaBadgeUnlocked, icon: "☕" },
    { name: "🍃 Spring Boot Master", desc: "Scored 85%+ on Spring Boot Quiz Challenge", unlocked: !!isSpringBootBadgeUnlocked, icon: "🍃" },
    { name: "🤖 AI Master", desc: "Scored 85%+ on AI & ML Quiz Challenge", unlocked: !!isAiBadgeUnlocked, icon: "🤖" },
    { name: "📊 DSA Master", desc: "Scored 85%+ on DSA Quiz Challenge", unlocked: !!isDsaBadgeUnlocked, icon: "📊" },
    { name: "🐍 Python Master", desc: "Scored 85%+ on Python Quiz Challenge", unlocked: !!isPythonBadgeUnlocked, icon: "🐍" },
    { name: "🌐 Web Dev Master", desc: "Scored 85%+ on Web Dev Quiz Challenge", unlocked: !!isWebDevBadgeUnlocked, icon: "🌐" },
    { name: "🛡️ Cyber Master", desc: "Scored 85%+ on Cyber Security Quiz Challenge", unlocked: !!isCyberBadgeUnlocked, icon: "🛡️" },
    { name: "☁️ Cloud Master", desc: "Scored 85%+ on Cloud Computing Quiz Challenge", unlocked: !!isCloudBadgeUnlocked, icon: "☁️" },
    { name: "🗄️ DBMS Master", desc: "Scored 85%+ on DBMS Quiz Challenge", unlocked: !!isDbmsBadgeUnlocked, icon: "🗄️" },
    { name: "🚀 Fast Learner", desc: "Completed a course in 3 days", unlocked: true, icon: "🚀" },
    { name: "🏆 Top Performer", desc: "Ranked Top 5 in leaderboard", unlocked: true, icon: "🏆" },
    { name: "💻 Code Ninja", desc: "Logged over 10 hours of active code study", unlocked: true, icon: "💻" },
    { name: "🧠 AI Conversationalist", desc: "Interacted with SphereAI 10+ times", unlocked: false, icon: "🧠" },
    { name: "💎 Elite Coder", desc: "Reached Level 10 or above in learning tracks", unlocked: false, icon: "💎" },
    { name: "🌟 Perfect Quizzer", desc: "Scored 100% on any final track assessment", unlocked: false, icon: "🌟" }
  ];

  // Mock Certificates
  const certificatesList = [
    { id: "CERT-SS-889A", title: "Modern Frontend Engineering (React & Vite)", date: "June 14, 2026" },
    { id: "CERT-SS-214B", title: "Decentralized Networks & Architecture Basics", date: "May 28, 2026" }
  ];

  return (
    <div className={`dashboard-page ${isSidebarOpen ? 'with-sidebar' : ''}`}>
      <Background />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={true} 
      />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="dashboard-content-wrapper">
        
        {/* Welcome Section */}
        <section className="welcome-card">
          <div className="welcome-info">
            <h1>Welcome back, {user?.full_name || user?.username || "Student"}!</h1>
            <p>Ready to unlock your potentials and level up your skills today?</p>
          </div>
          
          <div className="xp-tracker">
            <div className="xp-header">
              <span className="level-badge">LEVEL {level}</span>
              <span className="xp-numbers">{currentLevelProgress} / {xpNeededForNextLevel} XP</span>
            </div>
            <div className="xp-bar-bg">
              <div 
                className="xp-bar-fill" 
                style={{ width: `${(currentLevelProgress / xpNeededForNextLevel) * 100}%` }}
              ></div>
            </div>
            <span className="xp-to-next">{xpNeededForNextLevel - currentLevelProgress} XP to Level {level + 1}</span>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(0, 229, 255, 0.1)", color: "#00e5ff" }}>⚡</div>
            <div className="stat-info">
              <h3>Total Experience</h3>
              <div className="stat-value">{level * xpNeededForNextLevel + xp} XP</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(255, 0, 200, 0.1)", color: "#ff00c8" }}>🏆</div>
            <div className="stat-info">
              <h3>Badges Earned</h3>
              <div className="stat-value">{badgesList.filter(b => b.unlocked).length} / {badgesList.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(57, 255, 20, 0.1)", color: "#39ff14" }}>🎓</div>
            <div className="stat-info">
              <h3>Certificates</h3>
              <div className="stat-value">{certificatesList.length} Verified</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "rgba(138, 46, 255, 0.1)", color: "#8a2eff" }}>🔥</div>
            <div className="stat-info">
              <h3>Daily Streak</h3>
              <div className="stat-value">7 Days</div>
            </div>
          </div>
        </section>

        {/* Dashboard 2 Column Layout */}
        <div className="dashboard-layout">
          
          {/* Main Content Column */}
          <div className="main-column">
            
            {/* Courses Progress Panel */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">Courses in Progress</h2>
              </div>
              <div className="courses-list">
                {courses.map(course => (
                  <div key={course.id} className="course-card-compact">
                    <div className="course-details">
                      <span className="course-category">{course.category}</span>
                      <h4>{course.title}</h4>
                      <div className="course-progress-container">
                        <div className="course-progress-bg">
                          <div 
                            className="course-progress-fill" 
                            style={{ 
                              width: `${course.progress}%`,
                              backgroundColor: course.color,
                              boxShadow: `0 0 8px ${course.color}`
                            }}
                          ></div>
                        </div>
                        <span className="course-pct">{course.progress}%</span>
                      </div>
                    </div>
                    <button 
                      className="course-action-btn"
                      onClick={() => handleStudy(course.id)}
                      disabled={course.progress >= 100}
                      style={course.progress >= 100 ? { background: "rgba(255,255,255,0.05)", color: "#64748b", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "none", cursor: "not-allowed" } : {}}
                    >
                      {course.progress >= 100 ? "Completed" : "Study +5%"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Coding Compiler Section */}
            <div className="dashboard-panel coding-compiler-panel">
              <div className="section-title-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title">Online Code Sandbox</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label htmlFor="lang-select" style={{ fontSize: '13px', color: '#94a3b8' }}>Language:</label>
                  <select 
                    id="lang-select"
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    style={{
                      background: 'rgba(18, 18, 30, 0.75)',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      padding: '6px 12px',
                      fontFamily: 'Orbitron, sans-serif',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="python">Python 3</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                  </select>
                </div>
              </div>

              <div className="compiler-layout" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                {/* Code Editor Container */}
                <div style={{ position: 'relative', width: '100%' }}>
                  <textarea
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    placeholder="Write your code here..."
                    style={{
                      width: '100%',
                      height: '220px',
                      background: '#0d0e15',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '15px',
                      color: '#39ff14',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      resize: 'vertical',
                      outline: 'none',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '15px', right: '15px', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setEditorCode(languageTemplates[selectedLanguage])}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#94a3b8',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset Template
                    </button>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      style={{
                        background: isRunning ? 'rgba(57, 255, 20, 0.3)' : 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid #39ff14',
                        boxShadow: '0 0 8px rgba(57, 255, 20, 0.2)',
                        borderRadius: '6px',
                        color: '#39ff14',
                        padding: '6px 16px',
                        fontSize: '12px',
                        fontWeight: '700',
                        fontFamily: 'Orbitron, sans-serif',
                        cursor: isRunning ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isRunning ? 'Running...' : 'Run Code 🚀'}
                    </button>
                  </div>
                </div>

                {/* Console Output Screen */}
                <div style={{
                  background: '#040508',
                  border: '1px solid rgba(0, 229, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '15px',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '8px',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontFamily: 'Orbitron', fontSize: '11px', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '1px' }}>Console Output</span>
                    <button
                      onClick={() => setConsoleOutput("")}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '11px',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Clear Console
                    </button>
                  </div>
                  <pre style={{
                    margin: 0,
                    minHeight: '80px',
                    color: consoleOutput.includes('Error') ? '#ef4444' : '#e2e8f0',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                  }}>
                    {consoleOutput || 'Click "Run Code" to view execution output...'}
                  </pre>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">Achievements & Badges</h2>
              </div>
              <div className="badges-container">
                {badgesList.map((badge, idx) => (
                  <div key={idx} className={`badge-item-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="badge-visual">
                      {badge.icon}
                      {!badge.unlocked && (
                        <div className="lock-overlay">🔒</div>
                      )}
                    </div>
                    <h5>{badge.name}</h5>
                    <p>{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates Panel */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">Earned Certificates</h2>
              </div>
              <div className="certificates-grid">
                {certificatesList.map(cert => (
                  <div key={cert.id} className="cert-card">
                    <div className="cert-title">
                      <h4>{cert.title}</h4>
                      <span className="cert-date">Issued: {cert.date}</span>
                    </div>
                    <div className="cert-meta">
                      <span className="cert-id">VERIFICATION: {cert.id}</span>
                      <div className="cert-buttons">
                        <button className="cert-btn cert-btn-primary" onClick={() => setPreviewedCert(cert)}>
                          View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="sidebar-column">
            
            {/* Daily Quests Widget */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">Daily Quests</h2>
              </div>
              <div className="quests-list">
                {quests.map(quest => (
                  <div key={quest.id} className="quest-item">
                    <div className="quest-info">
                      <div className="quest-title">{quest.title}</div>
                      <div className="quest-xp">+{quest.xpReward} XP</div>
                    </div>
                    {quest.status === "COMPLETED" ? (
                      <span className="quest-status completed">Done</span>
                    ) : quest.status === "CLAIMABLE" ? (
                      <button 
                        className="quest-btn-claim"
                        onClick={() => handleClaimReward(quest.id, quest.xpReward)}
                      >
                        Claim
                      </button>
                    ) : (
                      <button 
                        className="quest-btn-claim" 
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                        onClick={() => handleStudy(1)} // Redirect interaction to studying
                      >
                        Start
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Standings */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">Leaderboard</h2>
              </div>
              <div className="leaderboard-widget">
                <div className="leaderboard-table">
                  {leaderboard.map(member => (
                    <div 
                      key={member.rank} 
                      className={`leaderboard-row ${member.isSelf ? 'current-user' : ''}`}
                    >
                      <div className={`rank-cell ${member.rank <= 3 ? 'top-3' : ''}`}>
                        {member.rank === 1 ? "🥇" : member.rank === 2 ? "🥈" : member.rank === 3 ? "🥉" : member.rank}
                      </div>
                      <div className="user-cell">
                        <div className="user-avatar-sm" style={{ background: member.isSelf ? "#00e5ff" : "rgba(255,255,255,0.1)" }}>
                          {(member.isSelf && user) ? (user.full_name ? user.full_name.charAt(0) : user.username.charAt(0)).toUpperCase() : member.username.charAt(0).toUpperCase()}
                        </div>
                        <span>
                          {member.isSelf ? (user?.full_name || user?.username || "You") : member.username}
                        </span>
                      </div>
                      <div className="xp-cell">{member.xp} XP</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Mentor Chatbot */}
            <div className="dashboard-panel">
              <div className="section-title-wrapper">
                <h2 className="section-title">AI Mentor</h2>
              </div>
              <div className="ai-mentor-panel">
                <div className="ai-chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="chat-bubble assistant" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(138, 46, 255, 0.08)' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>SphereAI is thinking...</span>
                    </div>
                  )}
                  <div ref={chatEndRef}></div>
                </div>
                
                <div className="chat-hints">
                  {quickPrompts.map((hint, i) => (
                    <span 
                      key={i} 
                      className="chat-hint-tag"
                      onClick={() => handleSendChat(hint)}
                      style={isChatLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    >
                      {hint}
                    </span>
                  ))}
                </div>

                <div className="chat-input-wrapper">
                  <input 
                    type="text" 
                    className="chat-input"
                    placeholder="Ask SphereAI..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendChat(chatInput);
                    }}
                    disabled={isChatLoading}
                  />
                  <button 
                    className="chat-send-btn"
                    onClick={() => handleSendChat(chatInput)}
                    disabled={isChatLoading || !chatInput.trim()}
                    style={isChatLoading ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    🚀
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Certificate Modal */}
      {previewedCert && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            background: 'linear-gradient(135deg, #0d0f19 0%, #05060b 100%)',
            border: '2px solid #00e5ff',
            borderRadius: '28px',
            boxShadow: '0 0 50px rgba(0, 229, 255, 0.3)',
            padding: '40px',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: "'Rajdhani', sans-serif"
          }}>
            {/* Ambient background glow */}
            <div style={{
              position: 'absolute',
              top: '-150px',
              left: '-150px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(0, 229, 255, 0.15)',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-150px',
              right: '-150px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 200, 0.15)',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }} />

            {/* Certificate Border Line */}
            <div style={{
              border: '1px dashed rgba(0, 229, 255, 0.3)',
              borderRadius: '20px',
              padding: '40px 20px',
              position: 'relative'
            }}>
              {/* Project Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '30px'
              }}>
                <div style={{
                  fontSize: '28px',
                  color: '#00e5ff',
                  textShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
                }}>⬢</div>
                <span style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#ffffff',
                  letterSpacing: '1px'
                }}>
                  <span>Skill</span>
                  <span style={{ color: '#ff00c8' }}>Sphere</span>
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '28px',
                fontWeight: '800',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginBottom: '20px',
                background: 'linear-gradient(90deg, #00e5ff, #8a2eff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Certificate of Completion
              </h2>

              <p style={{
                fontSize: '16px',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '25px'
              }}>
                This is proudly presented to
              </p>

              {/* Student Name */}
              <h1 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '42px',
                fontWeight: '800',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(0, 229, 255, 0.4)',
                margin: '10px 0 25px 0',
                borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-block',
                paddingBottom: '10px',
                paddingLeft: '30px',
                paddingRight: '30px'
              }}>
                {user?.full_name || user?.username || "SkillSphere Graduate"}
              </h1>

              <p style={{
                fontSize: '18px',
                color: '#cbd5e1',
                maxWidth: '600px',
                margin: '0 auto 35px auto',
                lineHeight: '1.6'
              }}>
                for successfully mastering the core modules, study tracks, and final checkpoints for
                <br />
                <strong style={{ color: '#00e5ff', fontSize: '20px' }}>{previewedCert.title}</strong>
              </p>

              {/* Meta details footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '650px',
                margin: '0 auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '25px',
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Date of Issue</span>
                  <strong style={{ color: '#ffffff' }}>{previewedCert.date}</strong>
                </div>
                
                {/* Decorative Circular Seal Medallion */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 229, 255, 0.08)',
                  border: '2px solid #00e5ff',
                  boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#00e5ff'
                }}>
                  🏆
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px' }}>Verification ID</span>
                  <strong style={{ color: '#ffffff', fontFamily: 'monospace' }}>{previewedCert.id}</strong>
                </div>
              </div>
            </div>

            {/* Close & Download Buttons */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
              <button 
                onClick={() => handleDownloadCertificate(previewedCert)}
                style={{
                  padding: '12px 35px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #00e5ff, #8a2eff)',
                  color: '#ffffff',
                  fontFamily: 'Orbitron',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 229, 255, 0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
              >
                Download Certificate
              </button>

              <button 
                onClick={() => setPreviewedCert(null)}
                style={{
                  padding: '12px 35px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'transparent',
                  color: '#ffffff',
                  fontFamily: 'Orbitron',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

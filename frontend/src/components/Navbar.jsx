import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import "../styles/navbar.css";

export default function Navbar({ toggleSidebar, isSidebarOpen, showSidebarToggle }) {
  const { user, logout, xp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {(showSidebarToggle || (user && user.role === 'STUDENT')) && (
          <button 
            className={`sidebar-toggle-btn-nav ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar || (() => {})}
            title="Toggle Sidebar"
          >
            <FiMenu />
          </button>
        )}
        <Link to={user ? (user.role === 'STUDENT' ? '/student-home' : '/workforce-home') : '/'} className="logo" style={{ textDecoration: 'none' }}>
          <div className="logoIcon">⬢</div>
          <span className="skill">Skill</span>
          <span className="sphere">Sphere</span>
        </Link>
      </div>

      <nav className="navLinks">
        <Link to={user ? (user.role === 'STUDENT' ? '/student-home' : '/workforce-home') : '/'} className="backHome">
          Home
        </Link>
        
        {user && user.role === 'STUDENT' && (
          <>
            <Link to="/student-features" style={{ color: location.pathname === "/student-features" ? "#00e5ff" : "" }}>Features</Link>
            <Link to="/courses" style={{ color: location.pathname === "/courses" ? "#00e5ff" : "" }}>Courses</Link>
            <Link to="/learning" style={{ color: location.pathname === "/learning" ? "#00e5ff" : "" }}>Learning</Link>
            <Link to="/progress" style={{ color: location.pathname === "/progress" ? "#00e5ff" : "" }}>Progress</Link>
            <Link to="/sandbox" style={{ color: location.pathname === "/sandbox" ? "#00e5ff" : "" }}>Sandbox</Link>
          </>
        )}

        {user && user.role === 'EMPLOYEE' && (
          <>
            <Link to="/workforce-features" style={{ color: location.pathname === "/workforce-features" ? "#ff00c8" : "" }}>Features</Link>
            <Link to="/workforce-dashboard" style={{ color: location.pathname === "/workforce-dashboard" ? "#ff00c8" : "" }}>Dashboard</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/features">Features</Link>
            <Link to="/workforce">Workforce</Link>
            <Link to="/sandbox" style={{ color: location.pathname === "/sandbox" ? "#00e5ff" : "" }}>Sandbox</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin-login" style={{ color: location.pathname === "/admin-login" ? "#00e5ff" : "#ffd700", fontWeight: "bold" }}>Admin Portal</Link>
          </>
        )}
      </nav>

      <div className="navButtons">
        {user && user.role === 'STUDENT' && (
          <button className="xpBtn" onClick={() => navigate('/student-home')}>⚡ {xp} XP</button>
        )}

        {user ? (
          <div className="userProfileContainer" onClick={() => {
            if (user.role === 'STUDENT') navigate('/student-home');
            else if (user.role === 'EMPLOYEE') navigate('/workforce-dashboard');
          }} style={{ cursor: (user.role === 'STUDENT' || user.role === 'EMPLOYEE') ? 'pointer' : 'default' }}>
            <div className="userProfileBadge">
              <div className="avatarCircle">
                {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
              </div>
              <div className="userInfoText">
                <span className="userName">{user.full_name || user.username}</span>
                <span className="userRoleBadge">{user.role}</span>
              </div>
            </div>
            <button className="logoutBtn" onClick={async (e) => { e.stopPropagation(); await logout(); navigate('/'); }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="loginBtn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="loginBtn" style={{ background: '#ff00c8', borderColor: '#ff00c8' }} onClick={() => navigate('/register')}>
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

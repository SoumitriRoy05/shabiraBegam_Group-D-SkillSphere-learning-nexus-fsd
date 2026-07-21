import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiSearch, FiBell, FiMessageCircle, FiChevronDown } from "react-icons/fi";
import "../styles/dashboard-navbar.css";

export default function DashboardNavbar({ toggleSidebar, isSidebarOpen }) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header className="dashboard-top-navbar">
      <div className="dash-nav-left">
        <button 
          className={`dash-sidebar-toggle ${isSidebarOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <FiMenu />
        </button>
        
        <div className="dash-search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="general search..." className="dash-search-input" />
        </div>
      </div>

      <nav className="dash-nav-links">
        <Link to="/dashboard" className={`dash-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
        <Link to="/courses" className="dash-link">Course</Link>
        <Link to="/schedule" className="dash-link">Schedule</Link>
        <Link to="/messages" className="dash-link">Messages</Link>
        <Link to="/friends" className="dash-link">Friends</Link>
      </nav>

      <div className="dash-nav-right">
        <div className="dash-nav-icons">
          <button className="dash-icon-btn">
            <FiMessageCircle />
            <span className="notification-dot"></span>
          </button>
          <button className="dash-icon-btn">
            <FiBell />
            <span className="notification-dot"></span>
          </button>
        </div>

        <div className="dash-user-profile">
          <div className="dash-user-info">
            <span className="dash-user-name">{user?.full_name || user?.username || "Jessica Smith"}</span>
            <span className="dash-user-role">{user?.role || "Student"}</span>
          </div>
          <div className="dash-user-avatar">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.username ? user.username.charAt(0).toUpperCase() : 'J')}
          </div>
          <FiChevronDown className="dash-dropdown-icon" />
        </div>
      </div>
    </header>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FiBookOpen, 
  FiMessageSquare, 
  FiFolder, 
  FiAward, 
  FiSettings,
  FiMenu,
  FiHome,
  FiX
} from "react-icons/fi";

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FiX />
          </button>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
            <FiHome className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/courses" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiBookOpen className="sidebar-icon" />
          <span>Courses</span>
        </NavLink>
        
        <NavLink to="/discussions" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiMessageSquare className="sidebar-icon" />
          <span>Discussions</span>
        </NavLink>
        
        <NavLink to="/certificate" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FiAward className="sidebar-icon" />
          <span>Certificate</span>
        </NavLink>

      </nav>
    </aside>
    </>
  );
};

export default DashboardSidebar;

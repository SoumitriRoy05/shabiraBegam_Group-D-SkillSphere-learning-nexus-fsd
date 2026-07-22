import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { FiUsers, FiBook, FiBriefcase, FiSettings, FiLogOut, FiEdit, FiTrash2, FiPlus, FiCheck, FiX, FiImage } from 'react-icons/fi';
import Background from '../../components/Background';
import '../../styles/dashboard.css';

export default function AdminDashboard() {
  const { logoutAdmin, courses, users, workforce, addCourse, updateCourse, deleteCourse, toggleStudentStatus, changeWorkforceStatus } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <div className="dashboard-page with-sidebar" style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Background />
      
      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        background: 'rgba(12, 12, 16, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(0, 229, 255, 0.2)',
        position: 'fixed',
        top: 0, bottom: 0, left: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#00e5ff', margin: 0, fontSize: '22px' }}>Admin Panel</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: '5px 0 0' }}>SkillSphere Master Control</p>
        </div>
        
        <nav style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <SidebarBtn icon={<FiBook />} label="Course Management" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <SidebarBtn icon={<FiUsers />} label="Student Management" active={activeTab === 'students'} onClick={() => setActiveTab('students')} />
          <SidebarBtn icon={<FiBriefcase />} label="Workforce Management" active={activeTab === 'workforce'} onClick={() => setActiveTab('workforce')} />
          <SidebarBtn icon={<FiSettings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', transition: 'all 0.2s', fontWeight: 'bold'
            }}
          >
            <FiLogOut /> Logout Admin
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '260px', padding: '40px', position: 'relative', zIndex: 10, minHeight: '100vh', overflowY: 'auto' }}>
        {activeTab === 'courses' && <CourseManagement courses={courses} addCourse={addCourse} updateCourse={updateCourse} deleteCourse={deleteCourse} />}
        {activeTab === 'students' && <StudentManagement users={users} toggleStudentStatus={toggleStudentStatus} />}
        {activeTab === 'workforce' && <WorkforceManagement workforce={workforce} changeWorkforceStatus={changeWorkforceStatus} />}
        {activeTab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
}

// ---------------- Components ----------------

function SidebarBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
      background: active ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.15), transparent)' : 'transparent',
      border: 'none', borderLeft: active ? '3px solid #00e5ff' : '3px solid transparent',
      color: active ? '#00e5ff' : 'var(--text-secondary)', borderRadius: '0 10px 10px 0',
      cursor: 'pointer', fontSize: '15px', fontWeight: active ? '600' : '400',
      transition: 'all 0.2s', width: '100%', textAlign: 'left'
    }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label}
    </button>
  );
}

// --- Course Management ---
function CourseManagement({ courses, addCourse, updateCourse, deleteCourse }) {
  const [editingCourse, setEditingCourse] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (course = null) => {
    if (course) {
      setEditingCourse(course);
    } else {
      setEditingCourse({
        title: '', description: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', 
        isPremium: false, price: 0, category: 'General', language: 'English'
      });
    }
    setIsFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCourse.id) {
      updateCourse(editingCourse.id, editingCourse);
    } else {
      addCourse(editingCourse);
    }
    setIsFormOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontFamily: 'Orbitron, sans-serif' }}>Course Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Add, edit, or remove courses from the platform.</p>
        </div>
        <button onClick={() => handleOpenForm()} style={{
          background: 'linear-gradient(90deg, #00e5ff, #8a2eff)', color: 'var(--text-primary)', border: 'none',
          padding: '12px 24px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
          cursor: 'pointer', boxShadow: '0 5px 15px rgba(0, 229, 255, 0.3)'
        }}>
          <FiPlus /> Add New Course
        </button>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: "1px solid var(--border-color)", borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>Course</th>
              <th style={{ padding: '16px 20px' }}>Type</th>
              <th style={{ padding: '16px 20px' }}>Price</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={course.image} alt="thumb" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{course.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{course.language} • {course.rating} ⭐</div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {course.isPremium ? 
                    <span style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>👑 Premium</span> 
                    : <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Free</span>}
                </td>
                <td style={{ padding: '16px 20px', color: '#00e5ff', fontWeight: 'bold' }}>
                  {course.isPremium ? `₹${course.price}` : '-'}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button onClick={() => handleOpenForm(course)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '15px' }}><FiEdit size={18} /></button>
                  <button onClick={() => deleteCourse(course.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '20px', width: '500px', padding: '30px' }}>
            <h2 style={{ margin: '0 0 20px', color: 'var(--text-primary)', fontFamily: 'Orbitron' }}>{editingCourse.id ? 'Edit Course' : 'Create Course'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Course Title</label>
                <input required value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Image URL</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input required value={editingCourse.image} onChange={e => setEditingCourse({...editingCourse, image: e.target.value})} style={inputStyle} />
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {editingCourse.image ? <img src={editingCourse.image} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <FiImage color="#64748b" />}
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Description</label>
                <textarea required value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} style={{...inputStyle, height: '80px', resize: 'none'}} />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Course Type</label>
                  <select value={editingCourse.isPremium ? "Premium" : "Free"} onChange={e => setEditingCourse({...editingCourse, isPremium: e.target.value === "Premium"})} style={inputStyle}>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div style={{ flex: 1, opacity: editingCourse.isPremium ? 1 : 0.5 }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Price (₹)</label>
                  <input type="number" required={editingCourse.isPremium} disabled={!editingCourse.isPremium} value={editingCourse.price} onChange={e => setEditingCourse({...editingCourse, price: parseInt(e.target.value) || 0})} style={inputStyle} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'linear-gradient(90deg, #00e5ff, #8a2eff)', border: 'none', color: 'var(--text-primary)', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Student Management ---
function StudentManagement({ users, toggleStudentStatus }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontFamily: 'Orbitron, sans-serif' }}>Student Management</h1>
      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: "1px solid var(--border-color)", borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>ID</th>
              <th style={{ padding: '16px 20px' }}>Name / Email</th>
              <th style={{ padding: '16px 20px' }}>Role</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>#{u.id}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '16px 20px', color: '#00e5ff' }}>{u.role}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.status === 'Active' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                    color: u.status === 'Active' ? '#22c55e' : '#ef4444', 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' 
                  }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button onClick={() => toggleStudentStatus(u.id)} style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)',
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer'
                  }}>
                    {u.status === 'Active' ? 'Block Access' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Workforce Management ---
function WorkforceManagement({ workforce, changeWorkforceStatus }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontFamily: 'Orbitron, sans-serif' }}>Workforce Management</h1>
      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: "1px solid var(--border-color)", borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>ID</th>
              <th style={{ padding: '16px 20px' }}>Name / Email</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workforce.map(w => (
              <tr key={w.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>#{w.id}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{w.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{w.email}</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: w.status === 'Approved' ? 'rgba(34, 197, 94, 0.15)' : w.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.15)', 
                    color: w.status === 'Approved' ? '#22c55e' : w.status === 'Rejected' ? '#ef4444' : '#eab308', 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' 
                  }}>
                    {w.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  {w.status !== 'Approved' && (
                    <button onClick={() => changeWorkforceStatus(w.id, 'Approved')} style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><FiCheck /></button>
                  )}
                  {w.status !== 'Rejected' && (
                    <button onClick={() => changeWorkforceStatus(w.id, 'Rejected')} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><FiX /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Settings ---
function SettingsPanel() {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontFamily: 'Orbitron, sans-serif' }}>Platform Settings</h1>
      <div style={{ maxWidth: '600px', background: 'rgba(15, 23, 42, 0.7)', border: "1px solid var(--border-color)", borderRadius: '16px', padding: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Platform Name</label>
          <input value="SkillSphere" readOnly style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Admin Notification Email</label>
          <input value="admin@skillsphere.com" readOnly style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Global Tax Rate (%)</label>
          <input value="18" type="number" readOnly style={inputStyle} />
        </div>
        <button style={{
          padding: '12px 24px', background: 'linear-gradient(90deg, #00e5ff, #8a2eff)', border: 'none', color: 'var(--text-primary)', borderRadius: '10px', fontWeight: 'bold', cursor: 'not-allowed', opacity: 0.7
        }}>
          Save Settings (Demo)
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none'
};

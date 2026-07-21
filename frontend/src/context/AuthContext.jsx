import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [completedTopics, setCompletedTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const savedXp = localStorage.getItem(`xp_${user.email || user.username}`);
      const savedTopics = localStorage.getItem(`completed_topics_${user.email || user.username}`);
      setXp(savedXp ? parseInt(savedXp, 10) : 0);
      setCompletedTopics(savedTopics ? JSON.parse(savedTopics) : []);
    } else {
      setXp(0);
      setCompletedTopics([]);
    }
  }, [user]);

  const earnXp = (amount) => {
    if (!user) return;
    setXp(prev => {
      const next = prev + amount;
      localStorage.setItem(`xp_${user.email || user.username}`, next.toString());
      return next;
    });
  };

  const completeTopic = (topicId, xpReward) => {
    if (!user) return;
    setCompletedTopics(prev => {
      if (prev.includes(topicId)) return prev;
      const next = [...prev, topicId];
      localStorage.setItem(`completed_topics_${user.email || user.username}`, JSON.stringify(next));
      earnXp(xpReward);
      return next;
    });
  };

  const clearSession = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  // Helper to attempt refreshing the access token
  const refreshSession = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok || !data.accessToken) {
      clearSession();
      throw new Error('Session expired. Please log in again.');
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.accessToken;
  };

  // Fetch the current user profile using the access token
  const fetchProfile = async (token, isRetry = false) => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Handle non-JSON responses (e.g. backend not running)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend not reachable');
      }

      const data = await response.json();

      if ((response.status === 401 || response.status === 403) && !isRetry) {
        // Token expired or invalid — try refresh once
        const newToken = await refreshSession();
        return fetchProfile(newToken, true);
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setUser(data.user);
    } catch (err) {
      console.error('Session restore failed:', err.message);
      clearSession();
    }
  };

  // Initialize session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetchProfile(token);
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const loginWithGoogle = async (credential, role) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, role }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.message || 'Authentication failed');

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const signupLocal = async (username, full_name, email, password, role) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, full_name, email, password, role }),
    });

    let data;
    try { data = await response.json(); } catch { throw new Error('Server returned an invalid response.'); }
    if (!response.ok || !data.success) throw new Error(data.message || 'Registration failed');

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const loginLocal = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try { data = await response.json(); } catch { throw new Error('Server returned an invalid response.'); }
    if (!response.ok || !data.success) throw new Error(data.message || 'Login failed');

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearSession();
      navigate('/login');
    }
  };

  // Wrapper for authenticated fetch requests (with auto token refresh)
  const authenticatedFetch = async (url, options = {}) => {
    let token = localStorage.getItem('accessToken');

    const makeRequest = (t) => fetch(url, {
      ...options,
      headers: { ...options.headers, 'Authorization': `Bearer ${t}` },
    });

    let response = await makeRequest(token);

    if (response.status === 401 || response.status === 403) {
      try {
        const newToken = await refreshSession();
        response = await makeRequest(newToken);
      } catch (err) {
        navigate('/login');
        throw err;
      }
    }

    return response;
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    signupLocal,
    loginLocal,
    logout,
    authenticatedFetch,
    xp,
    earnXp,
    completedTopics,
    completeTopic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

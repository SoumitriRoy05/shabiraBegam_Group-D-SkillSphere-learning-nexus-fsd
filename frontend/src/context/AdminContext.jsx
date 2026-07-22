import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminContext = createContext(null);

const initialCoursesData = [
  {
    id: 1,
    title: "Frontend System Design",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    isPremium: true,
    price: 999,
    language: "English",
    rating: "4.8",
    reviews: "5K+",
    description: "Go from Zero to Hero in Frontend System Design. Master large-scale application architecture."
  },
  {
    id: 2,
    title: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    isPremium: true,
    price: 499,
    language: "English",
    rating: "4.7",
    reviews: "40K+",
    description: "Master React.js. Learn from the ground up and build real-world applications with ease."
  },
  {
    id: 3,
    title: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.8",
    reviews: "50K+",
    description: "A pure in-depth JavaScript Course released for Free."
  },
  {
    id: 4,
    title: "Data Structures & Algorithms (DSA)",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1499,
    language: "English",
    rating: "4.9",
    reviews: "100K+",
    description: "Comprehensive DSA bootcamp for FAANG interviews. Covers arrays, trees, dynamic programming and more."
  },
  {
    id: 5,
    title: "Generative AI Engineering",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1999,
    language: "English",
    rating: "4.9",
    reviews: "12K+",
    description: "Learn to build LLM applications, RAG pipelines, and integrate AI into your software."
  },
  {
    id: 6,
    title: "Machine Learning Foundations",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.6",
    reviews: "25K+",
    description: "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation."
  },
  {
    id: 7,
    title: "Advanced Node.js & Microservices",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    isPremium: true,
    price: 799,
    language: "English",
    rating: "4.7",
    reviews: "18K+",
    description: "Scale your backend architecture. Learn Docker, Kubernetes, and Node.js microservices."
  },
  {
    id: 8,
    title: "Fullstack Next.js 14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1299,
    language: "English",
    rating: "4.8",
    reviews: "30K+",
    description: "Build SEO-friendly, highly performant web applications using App Router and Server Actions."
  },
  {
    id: 9,
    title: "Web3 & Solidity Development",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1999,
    language: "English",
    rating: "4.5",
    reviews: "8K+",
    description: "Master blockchain development, smart contracts, and decentralized application (dApp) design."
  },
  {
    id: 10,
    title: "Cloud Computing with AWS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.7",
    reviews: "55K+",
    description: "Get certified. Learn EC2, S3, Lambda, and complete AWS infrastructure management."
  },
  {
    id: 11,
    title: "Python for Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    isPremium: true,
    price: 899,
    language: "English",
    rating: "4.8",
    reviews: "60K+",
    description: "Master Pandas, NumPy, Matplotlib, and data analysis techniques using Python."
  },
  {
    id: 12,
    title: "UI/UX Design Masterclass",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    isPremium: true,
    price: 699,
    language: "English",
    rating: "4.9",
    reviews: "22K+",
    description: "Learn Figma, design thinking, user research, and build stunning user interfaces."
  }
];

const initialUsersData = [
  { id: 101, name: "Alice Johnson", email: "alice@example.com", role: "STUDENT", status: "Active" },
  { id: 102, name: "Bob Smith", email: "bob@example.com", role: "STUDENT", status: "Active" },
  { id: 103, name: "Charlie Davis", email: "charlie@example.com", role: "STUDENT", status: "Blocked" },
  { id: 104, name: "David Wilson", email: "david@example.com", role: "STUDENT", status: "Active" }
];

const initialWorkforceData = [
  { id: 201, name: "Eve Trainer", email: "eve@skillsphere.com", role: "WORKFORCE", status: "Approved" },
  { id: 202, name: "Frank Mentor", email: "frank@skillsphere.com", role: "WORKFORCE", status: "Pending" },
  { id: 203, name: "Grace Guide", email: "grace@skillsphere.com", role: "WORKFORCE", status: "Rejected" }
];

export function AdminProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('admin_courses');
    return saved ? JSON.parse(saved) : initialCoursesData;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : initialUsersData;
  });

  const [workforce, setWorkforce] = useState(() => {
    const saved = localStorage.getItem('admin_workforce');
    return saved ? JSON.parse(saved) : initialWorkforceData;
  });
  
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('admin_session') === 'true';
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('admin_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('admin_workforce', JSON.stringify(workforce));
  }, [workforce]);

  const loginAdmin = (email, password) => {
    // Hardcoded simple check for admin
    if (email === "admin@skillsphere.com" && password === "admin123") {
      setIsAdminAuth(true);
      localStorage.setItem('admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('admin_session');
  };

  // Course Management
  const addCourse = (course) => {
    setCourses(prev => [...prev, { ...course, id: Date.now() }]);
  };
  const updateCourse = (id, updatedCourse) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedCourse } : c));
  };
  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Student Management
  const toggleStudentStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return u;
    }));
  };
  const updateStudent = (id, updated) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
  };
  const deleteStudent = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Workforce Management
  const changeWorkforceStatus = (id, status) => {
    setWorkforce(prev => prev.map(w => w.id === id ? { ...w, status } : w));
  };

  const value = {
    isAdminAuth, loginAdmin, logoutAdmin,
    courses, addCourse, updateCourse, deleteCourse,
    users, toggleStudentStatus, updateStudent, deleteStudent,
    workforce, changeWorkforceStatus
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
}

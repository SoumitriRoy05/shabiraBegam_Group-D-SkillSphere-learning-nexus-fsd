import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import Background from "../components/Background";
import CourseCard from "../components/CourseCard";
import { FiSearch, FiCheckCircle, FiShoppingCart, FiX, FiLock, FiBookOpen, FiAward, FiZap } from "react-icons/fi";
import "../styles/courses.css";

// 12 Mock Courses based on trending topics
const initialCoursesData = [
  {
    id: 1,
    title: "Frontend System Design",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.8",
    reviews: "5K+",
    description: "Go from Zero to Hero in Frontend System Design. Master large-scale application architecture.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 2,
    title: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.7",
    reviews: "40K+",
    description: "Master React.js. Learn from the ground up and build real-world applications with ease.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 3,
    title: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
    isPremium: false,
    language: "English",
    rating: "4.8",
    reviews: "50K+",
    description: "A pure in-depth JavaScript Course released for Free.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 4,
    title: "Data Structures & Algorithms (DSA)",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.9",
    reviews: "100K+",
    description: "Comprehensive DSA bootcamp for FAANG interviews. Covers arrays, trees, dynamic programming and more.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 5,
    title: "Generative AI Engineering",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.9",
    reviews: "12K+",
    description: "Learn to build LLM applications, RAG pipelines, and integrate AI into your software.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 6,
    title: "Machine Learning Foundations",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    isPremium: false,
    language: "English",
    rating: "4.6",
    reviews: "25K+",
    description: "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 7,
    title: "Advanced Node.js & Microservices",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.7",
    reviews: "18K+",
    description: "Scale your backend architecture. Learn Docker, Kubernetes, and Node.js microservices.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 8,
    title: "Fullstack Next.js 14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.8",
    reviews: "30K+",
    description: "Build SEO-friendly, highly performant web applications using App Router and Server Actions.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 9,
    title: "Web3 & Solidity Development",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.5",
    reviews: "8K+",
    description: "Master blockchain development, smart contracts, and decentralized application (dApp) design.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 10,
    title: "Cloud Computing with AWS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    isPremium: false,
    language: "English",
    rating: "4.7",
    reviews: "55K+",
    description: "Get certified. Learn EC2, S3, Lambda, and complete AWS infrastructure management.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 11,
    title: "Python for Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.8",
    reviews: "60K+",
    description: "Master Pandas, NumPy, Matplotlib, and data analysis techniques using Python.",
    isEnrolled: false,
    progress: 0
  },
  {
    id: 12,
    title: "UI/UX Design Masterclass",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    isPremium: true,
    language: "English",
    rating: "4.9",
    reviews: "22K+",
    description: "Learn Figma, design thinking, user research, and build stunning user interfaces.",
    isEnrolled: false,
    progress: 0
  }
];

export default function CoursesPage() {
  const { user, earnXp, completedTopics } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Cart & Checkout state
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Initialize course list with persisted enrollments from localStorage
  const [courses, setCourses] = useState(() => {
    try {
      const savedIds = localStorage.getItem("enrolled_course_ids");
      const savedProgress = localStorage.getItem("course_progress_map");
      const progressMap = savedProgress ? JSON.parse(savedProgress) : {};
      const enrolledIds = savedIds ? JSON.parse(savedIds) : [1, 2, 3]; // Default demo
      
      return initialCoursesData.map(course => {
        const isEnrolled = enrolledIds.includes(course.id);
        const progress = isEnrolled ? (progressMap[course.id] !== undefined ? progressMap[course.id] : 0) : 0;
        return {
          ...course,
          isEnrolled,
          progress
        };
      });
    } catch {
      return initialCoursesData;
    }
  });

  // Calculate real-time progress strictly isolated per specific course ID out of 6 modules
  const getDynamicProgress = (courseId, fallbackProgress) => {
    const completedList = completedTopics || [];

    const prefixMap = {
      1: "fsd_",
      2: "react_",
      3: "javascript_",
      4: "dsa_",
      5: "genai_",
      6: "ml_",
      7: "node_",
      8: "nextjs_",
      9: "web3_",
      10: "aws_",
      11: "python_",
      12: "uiux_"
    };

    const prefix = prefixMap[courseId];
    if (prefix) {
      const matchCount = completedList.filter(id => id.startsWith(prefix)).length;
      return Math.round((matchCount / 6) * 100);
    }

    return 0; // Newly enrolled courses show 0%
  };

  // Triggered when user clicks "Enroll Now" -> Opens Cart / Checkout modal
  const handleEnrollClick = (courseId) => {
    const courseToCheckout = courses.find(c => c.id === courseId);
    if (courseToCheckout) {
      setCheckoutCourse(courseToCheckout);
    }
  };

  // Triggered when user completes Checkout Modal action
  const handleCompleteCheckout = () => {
    if (!checkoutCourse) return;
    setIsProcessingCheckout(true);

    setTimeout(() => {
      const courseId = checkoutCourse.id;
      
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          // Set progress to 0% for newly checked out course!
          return { ...course, isEnrolled: true, progress: 0 };
        }
        return course;
      });

      setCourses(updatedCourses);

      // Save to localStorage
      const enrolledIds = updatedCourses.filter(c => c.isEnrolled).map(c => c.id);
      localStorage.setItem("enrolled_course_ids", JSON.stringify(enrolledIds));
      
      const savedProgress = localStorage.getItem("course_progress_map");
      const progressMap = savedProgress ? JSON.parse(savedProgress) : {};
      progressMap[courseId] = 0; // Newly enrolled course starts at 0%
      localStorage.setItem("course_progress_map", JSON.stringify(progressMap));

      // Earn XP reward
      if (earnXp) {
        earnXp(100);
      }

      setIsProcessingCheckout(false);
      setCheckoutCourse(null);

      // Trigger toast message
      setToastMessage(`🎉 Checkout Complete! Successfully enrolled in "${checkoutCourse.title}" with 0% progress! +100 XP awarded!`);
      setTimeout(() => {
        setToastMessage("");
      }, 4500);
    }, 600);
  };

  const handleContinue = (courseId) => {
    // Map each course ID directly to its unique track key in LearningPage
    const trackMap = {
      1: "fsd",
      2: "react",
      3: "javascript",
      4: "dsa",
      5: "genai",
      6: "ml",
      7: "node",
      8: "nextjs",
      9: "web3",
      10: "aws",
      11: "python",
      12: "uiux"
    };

    const trackKey = trackMap[courseId] || "react";
    navigate(`/learning?track=${trackKey}`, { state: { track: trackKey } });
  };

  // Filter courses by tab & search query with dynamic progress sync
  const filteredCourses = courses.map(course => ({
    ...course,
    progress: course.isEnrolled ? getDynamicProgress(course.id, course.progress) : 0
  })).filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === "enrolled") return course.isEnrolled;
    if (activeFilter === "free") return !course.isPremium;
    if (activeFilter === "premium") return course.isPremium;
    return true; // "all"
  });

  return (
    <div className={`courses-page ${isSidebarOpen ? 'with-sidebar' : ''}`}>
      <Background />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={true} 
      />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="courses-content-wrapper">
        
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '85px',
            right: '25px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #00e5ff, #8a2be2)',
            color: '#ffffff',
            padding: '14px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: '600',
            fontSize: '15px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <FiCheckCircle size={22} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Checkout & Cart Drawer / Modal Overlay */}
        {checkoutCourse && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5, 6, 11, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(145deg, #0f172a, #1e1b4b)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 255, 0.2)',
              position: 'relative',
              animation: 'slideUp 0.3s ease'
            }}>
              <button 
                onClick={() => setCheckoutCourse(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                <FiX />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e5ff', marginBottom: '15px' }}>
                <FiShoppingCart size={24} />
                <h2 style={{ margin: 0, fontFamily: 'Orbitron, sans-serif', fontSize: '22px' }}>Course Checkout</h2>
              </div>

              {/* Course Item Summary */}
              <div style={{
                display: 'flex',
                gap: '15px',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}>
                <img 
                  src={checkoutCourse.image} 
                  alt={checkoutCourse.title} 
                  style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', color: '#ffffff' }}>{checkoutCourse.title}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#94a3b8', lineHeight: '1.3' }}>{checkoutCourse.description}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '11px', background: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff', padding: '3px 8px', borderRadius: '10px' }}>GFG Study Notes Included</span>
                    <span style={{ fontSize: '11px', background: 'rgba(255, 0, 200, 0.15)', color: '#ff00c8', padding: '3px 8px', borderRadius: '10px' }}>Certificate Unlocked</span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '12px', marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>
                  <span>Course Tuition Fee:</span>
                  <span style={{ textDecoration: 'line-through' }}>₹4,999.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#22c55e' }}>
                  <span>SkillSphere Scholarship Grant (100% OFF):</span>
                  <span>-₹4,999.00</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>
                  <span>Total Due Today:</span>
                  <span style={{ color: '#00e5ff' }}>₹0.00</span>
                </div>
              </div>

              {/* Included Perks */}
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiLock /> Instant Access</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiZap /> +100 XP Bonus</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiBookOpen /> GFG Notes</span>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleCompleteCheckout}
                disabled={isProcessingCheckout}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(90deg, #00e5ff, #8a2be2)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '25px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 229, 255, 0.4)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isProcessingCheckout ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <span>Complete Checkout & Enroll (0% Progress)</span>
                    <FiCheckCircle />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="courses-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>Our Courses</h1>
            <p>Level up your skills with our top-rated industry tracks.</p>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: '25px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {[
            { id: "all", label: "All Courses" },
            { id: "enrolled", label: `My Enrolled (${courses.filter(c => c.isEnrolled).length})` },
            { id: "free", label: "Free Courses" },
            { id: "premium", label: "Premium Tracks" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: activeFilter === tab.id ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeFilter === tab.id ? 'rgba(0, 229, 255, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                color: activeFilter === tab.id ? '#00e5ff' : '#94a3b8',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={handleEnrollClick}
                onContinue={handleContinue}
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              <h3>No courses found</h3>
              <p>Try adjusting your search query or filter selection.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

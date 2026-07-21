import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import Background from "../components/Background";
import CourseCard from "../components/CourseCard";
import "../styles/courses.css";

// 12 Mock Courses based on trending topics
const mockCourses = [
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="courses-header">
          <h1>Our Courses</h1>
          <p>Level up your skills with our top-rated programs.</p>
        </div>

        <div className="courses-grid">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}

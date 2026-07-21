import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/dashboard.css";

export default function DiscussionsPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alexis Mangin",
      avatar: "A",
      role: "Frontend Architect",
      time: "2 hours ago",
      category: "System Design",
      title: "How do you handle micro-frontend state sync across independent React apps?",
      content: "When splitting a large monolithic web application into micro-frontends using Webpack Module Federation, what is your preferred approach for sharing global auth tokens and theme states without tight coupling?",
      upvotes: 24,
      isUpvoted: false,
      comments: [
        { id: 101, author: "CypherLearner", time: "1 hour ago", text: "We use CustomEvent bus on the window object combined with RxJS behavior subjects for decoupled pub/sub events!" },
        { id: 102, author: "NeonCoder", time: "45 mins ago", text: "Single-SPA with shared React Context wrappers works great for auth headers." }
      ]
    },
    {
      id: 2,
      author: "Hitesh Choudhary",
      avatar: "H",
      role: "Senior Educator",
      time: "5 hours ago",
      category: "React & Frontend",
      title: "Common React 19 useActionState gotchas for beginners",
      content: "React 19 introduces useActionState and Server Actions. Make sure you return structured objects containing error messages and pending states instead of mutating local component state manually!",
      upvotes: 42,
      isUpvoted: false,
      comments: [
        { id: 201, author: "ByteKnight", time: "3 hours ago", text: "Super helpful tip! The optimistic UI updates with useOptimistic are also incredible." }
      ]
    },
    {
      id: 3,
      author: "Andrew Ng",
      avatar: "A",
      role: "AI Lead",
      time: "1 day ago",
      category: "Generative AI",
      title: "RAG vs Fine-Tuning: Which should you choose for enterprise docs?",
      content: "If your underlying knowledge base changes daily or weekly, RAG (Retrieval Augmented Generation) with Vector DBs like Pinecone/FAISS is far superior and more cost-effective than continuous LLM fine-tuning.",
      upvotes: 56,
      isUpvoted: false,
      comments: [
        { id: 301, author: "SynthGuru", time: "18 hours ago", text: "Agreed! HyDE (Hypothetical Document Embeddings) improved our RAG precision by 30%." }
      ]
    },
    {
      id: 4,
      author: "Java Guru",
      avatar: "J",
      role: "Backend Lead",
      time: "2 days ago",
      category: "Java & Backend",
      title: "Spring Boot Virtual Threads (Project Loom) performance benchmark",
      content: "Switching from standard Tomcat thread pools to Spring Boot 3.2 Virtual Threads handled 10,000 concurrent HTTP requests with 80% less memory allocation on JRE 21!",
      upvotes: 31,
      isUpvoted: false,
      comments: []
    }
  ]);

  // New Post Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("React & Frontend");
  const [newContent, setNewContent] = useState("");

  // Add new comment state per post
  const [commentInputs, setCommentInputs] = useState({});

  const handleToggleUpvote = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          isUpvoted: !p.isUpvoted
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: user?.full_name || user?.username || "SkillSphere Learner",
      time: "Just now",
      text: text.trim()
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newCommentObj]
        };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPostObj = {
      id: Date.now(),
      author: user?.full_name || user?.username || "SkillSphere Learner",
      avatar: (user?.full_name || user?.username || "S").charAt(0).toUpperCase(),
      role: user?.role || "Student",
      time: "Just now",
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      upvotes: 1,
      isUpvoted: true,
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowCreateModal(false);
  };

  const filteredPosts = posts.filter(p => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="dashboard-page" style={{ minHeight: '100vh', background: '#05060b', color: '#fff' }}>
      <Background />
      <Navbar showSidebarToggle={true} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 24px 60px 24px' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '35px' }}>
          <div>
            <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', color: '#00e5ff', margin: '0 0 8px 0' }}>
              💬 Community Discussions
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
              Ask technical questions, share code architecture insights, and learn with fellow SkillSphere developers!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            style={{
              background: 'linear-gradient(90deg, #00e5ff, #8a2eff)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '30px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)'
            }}
          >
            + Start New Discussion
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {["All", "React & Frontend", "Java & Backend", "System Design", "Generative AI"].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'linear-gradient(90deg, rgba(0,229,255,0.2), rgba(138,46,255,0.2))' : 'rgba(15, 23, 42, 0.7)',
                  border: activeCategory === cat ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activeCategory === cat ? '#00e5ff' : '#94a3b8',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="🔍 Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '14px',
              width: '260px'
            }}
          />
        </div>

        {/* Discussions Posts Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px' }}>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>No discussions found for "{searchTerm}". Be the first to start a topic!</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <article 
                key={post.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Author Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00e5ff, #8a2eff)',
                      color: '#ffffff', fontWeight: '800', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                    }}>
                      {post.avatar}
                    </div>
                    <div>
                      <strong style={{ color: '#f8fafc', fontSize: '15px', display: 'block' }}>{post.author}</strong>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{post.role} • {post.time}</span>
                    </div>
                  </div>
                  <span style={{
                    background: 'rgba(0, 229, 255, 0.12)',
                    color: '#00e5ff',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    padding: '4px 12px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    fontFamily: 'Orbitron, sans-serif'
                  }}>
                    {post.category}
                  </span>
                </div>

                {/* Title & Body */}
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '20px', color: '#ffffff', marginBottom: '10px', lineHeight: '1.4' }}>
                  {post.title}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {post.content}
                </p>

                {/* Action Buttons Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(post.id)}
                    style={{
                      background: post.isUpvoted ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: post.isUpvoted ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: post.isUpvoted ? '#00e5ff' : '#94a3b8',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>▲ Upvote ({post.upvotes})</span>
                  </button>

                  <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>
                    💬 {post.comments.length} Comments
                  </span>
                </div>

                {/* Comments List */}
                {post.comments.length > 0 && (
                  <div style={{ marginTop: '20px', paddingLeft: '15px', borderLeft: '2px solid rgba(0, 229, 255, 0.3)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {post.comments.map(c => (
                      <div key={c.id} style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px 14px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <strong style={{ color: '#00e5ff', fontSize: '13px' }}>{c.author}</strong>
                          <span style={{ color: '#64748b', fontSize: '11px' }}>{c.time}</span>
                        </div>
                        <p style={{ color: '#e2e8f0', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddComment(post.id);
                    }}
                    style={{
                      flex: 1,
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '16px',
                      fontSize: '13px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    style={{
                      background: 'rgba(0, 229, 255, 0.15)',
                      border: '1px solid rgba(0, 229, 255, 0.4)',
                      color: '#00e5ff',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Reply
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px', backdropFilter: 'blur(8px)'
          }}>
            <form onSubmit={handleCreatePost} style={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #00e5ff',
              borderRadius: '24px',
              padding: '35px 30px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 0 50px rgba(0, 229, 255, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', color: '#00e5ff', fontSize: '22px', margin: 0 }}>
                  Start New Technical Discussion
                </h3>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>
                  ✖
                </button>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px', fontWeight: '700' }}>Topic Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to optimize React re-renders with useMemo?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px', fontWeight: '700' }}>Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                >
                  <option value="React & Frontend">React & Frontend</option>
                  <option value="Java & Backend">Java & Backend</option>
                  <option value="System Design">System Design</option>
                  <option value="Generative AI">Generative AI</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px', fontWeight: '700' }}>Discussion Content:</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your question or code architecture scenario in detail..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(90deg, #00e5ff, #8a2eff)', color: '#fff', border: 'none', padding: '10px 26px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Publish Post 🚀
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import { FiVolume2, FiStar, FiArrowRight } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

export default function CourseCard({ course, onEnroll, onContinue }) {
  const { 
    id,
    title, 
    image, 
    isPremium, 
    language, 
    rating, 
    reviews, 
    description, 
    isEnrolled, 
    progress 
  } = course;

  return (
    <div className="course-card">
      <img 
        src={image} 
        alt={title} 
        className="course-thumbnail" 
        onClick={() => {
          if (isEnrolled && onContinue) onContinue(id);
          else if (onEnroll) onEnroll(id);
        }}
        style={{ cursor: 'pointer' }}
      />
      
      <div className="course-content">
        <h3 
          className="course-title"
          onClick={() => {
            if (isEnrolled && onContinue) onContinue(id);
            else if (onEnroll) onEnroll(id);
          }}
          style={{ cursor: 'pointer', color: '#ffffff', transition: 'color 0.2s' }}
        >
          {title}
        </h3>
        
        <div className="course-meta">
          {isPremium ? (
            <span className="badge premium">
              <FaCrown /> Premium
            </span>
          ) : (
            <span className="badge free">Free</span>
          )}
          
          <span className="course-meta-item">
            <FiVolume2 className="course-meta-icon" /> {language}
          </span>
          
          <span className="course-meta-item">
            <FiStar className="course-meta-icon rating-star" fill="#f1c40f" /> 
            {rating} ({reviews} Reviews)
          </span>

          {isEnrolled && (
            <span className="badge enrolled">Enrolled</span>
          )}
        </div>
        
        <p className="course-desc">{description}</p>
        
        <div className="course-footer">
          {isEnrolled ? (
            <div className="enrolled-footer-actions">
              <div className="progress-container">
                <span className="progress-text">{progress}% completed</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${Math.max(progress, 5)}%` }}></div>
                </div>
              </div>
              <button 
                className="continue-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onContinue) onContinue(id);
                }}
                style={{
                  marginTop: '12px',
                  background: 'linear-gradient(90deg, #00e5ff, #8a2be2)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  zIndex: 20
                }}
              >
                <span>Continue Learning</span> <FiArrowRight />
              </button>
            </div>
          ) : (
            <button 
              className="enroll-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onEnroll) onEnroll(id);
              }}
              style={{
                position: 'relative',
                zIndex: 20,
                cursor: 'pointer'
              }}
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

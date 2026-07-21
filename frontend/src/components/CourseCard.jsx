import React from "react";
import { FiVolume2, FiStar } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

export default function CourseCard({ course }) {
  const { 
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
      <img src={image} alt={title} className="course-thumbnail" />
      
      <div className="course-content">
        <h3 className="course-title">{title}</h3>
        
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
            <div className="progress-container">
              <span className="progress-text">{progress}% completed</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <button className="enroll-btn">Enroll Now</button>
          )}
        </div>
      </div>
    </div>
  );
}

import "../styles/learningPage.css";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import {
  FaBookOpen,
  FaCertificate,
  FaRobot,
  FaArrowRight
} from "react-icons/fa";

export default function LearningPage() {
  return (
    <>
    <Background />
      <Navbar />

      <section className="learningHero">

        <div className="learningGlow glow1"></div>
        <div className="learningGlow glow2"></div>

        <div className="learningLeft">

          <div className="learningBadge">
            📚 Personalized Learning
          </div>

          <h1>
            Learn
            <span> Smarter </span>
            with
            <span> AI </span>
          </h1>

          <p>
            Explore AI-powered courses, certifications,
            quizzes and personalized learning paths.
            Login to unlock your complete learning dashboard.
          </p>

          <div className="learningButtons">
            <button className="primaryBtn">
              Login
            </button>

{/*             <button className="secondaryBtn"> */}
{/*               Explore */}
{/*             </button> */}
          </div>

        </div>

        <div className="learningRight">

          <div className="learningCard">

            <h3>Your Learning Preview</h3>

            <div className="cardRow">
              <FaBookOpen />
              <span>500+ Courses</span>
            </div>

            <div className="cardRow">
              <FaCertificate />
              <span>Industry Certificates</span>
            </div>

            <div className="cardRow">
              <FaRobot />
              <span>AI Mentor</span>
            </div>

            <button className="unlockBtn">
              Unlock Everything
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>
    </>
  );
}
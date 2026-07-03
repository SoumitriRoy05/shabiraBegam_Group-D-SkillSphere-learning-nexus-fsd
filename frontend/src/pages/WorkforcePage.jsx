import "../styles/workforcePage.css";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import {
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaArrowRight
} from "react-icons/fa";

export default function WorkforcePage() {
  return (
    <>
    <Background />
      <Navbar />

      <section className="workforceHero">

        <div className="workforceGlow glow1"></div>
        <div className="workforceGlow glow2"></div>

        <div className="workforceLeft">

          <div className="workforceBadge">
            💼 Smart Workforce Management
          </div>

          <h1>
            Manage
            <span> Teams </span>
            &
            <span> Performance </span>
            Smarter
          </h1>

          <p>
            Simplify employee management with attendance tracking,
            AI-powered performance insights, training management,
            task allocation and workforce analytics—all from one
            intelligent dashboard.
          </p>

          <div className="workforceButtons">

            <button className="primaryBtn">
              Employee Login
            </button>

            <button className="secondaryBtn">
              Explore
            </button>

          </div>

        </div>

        <div className="workforceRight">

          <div className="workforceCard">

            <h3>Workforce Dashboard</h3>

            <div className="cardRow">
              <FaUsers />
              <span>Employee Directory</span>
            </div>

            <div className="cardRow">
              <FaClipboardCheck />
              <span>Attendance & Leave</span>
            </div>

            <div className="cardRow">
              <FaChartLine />
              <span>Performance Analytics</span>
            </div>

            <button className="unlockBtn">
              Login to Continue
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>

    </>
  );
}
// import Navbar from "../components/Navbar";
//
// export default function FeaturesPage() {
//   return (
//     <>
//       <Navbar />
//
//       <div style={{ paddingTop: "140px", color: "white", textAlign: "center" }}>
//         <h1>Features</h1>
//
//         <p>
//           Complete feature information will be available after login.
//         </p>
//       </div>
//     </>
//   );
// }

import "../styles/featurePage.css";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import {
  FaGraduationCap,
  FaUsers,
  FaBrain,
  FaArrowRight,
   FaTrophy,
    FaChartLine,
    FaShieldAlt
} from "react-icons/fa";

export default function FeaturePage() {
  return (
    <>
    <Background />
      <Navbar />

      <section className="featureHero">

        <div className="featureGlow glow1"></div>
        <div className="featureGlow glow2"></div>

        <div className="featureContent">

          <div className="featureBadge">
            🚀 AI Powered Learning Platform
          </div>

          <h1>
            Discover the Future of
            <span> Learning </span>
            &
            <span> Workforce </span>
            Management
          </h1>

          <p>
            SkillSphere combines intelligent learning,
            employee management and AI powered analytics
            into one futuristic platform designed for
            students, educators and organizations.
          </p>

          <div className="heroButtons">

            <button className="primaryFeatureBtn">
              Get Started
            </button>

            <button className="secondaryFeatureBtn">
              Login
            </button>

          </div>

        </div>

        <div className="dashboardPreview">

          <div className="dashboardCard">

            <div className="topProfile">

              <div className="avatar">👩‍💻</div>

              <div>

                <h3>Sarah Johnson</h3>

                <span>Senior Developer</span>

              </div>

              <div className="level">
                LVL 32
              </div>

            </div>

            <h4>Monthly Progress</h4>

            <div className="progressBar">
              <div className="progressFill"></div>
            </div>

            <div className="dashboardRow">
              <span>React Certification</span>
              <strong>✔</strong>
            </div>

            <div className="dashboardRow">
              <span>Leadership Training</span>
              <strong>✔</strong>
            </div>

            <div className="dashboardRow">
              <span>Quarterly Goals</span>
              <strong>94%</strong>
            </div>

            <div className="dashboardRow">
              <span>Performance Score</span>

              <strong className="green">
                96%
              </strong>

            </div>

          </div>

        </div>

      </section>

      <section className="featureHighlights">

        <h2>Everything You Need</h2>

        <p>
          Powerful tools for students,
          professionals and organizations.
        </p>

        <div className="featureGrid">

          <div className="featureCard">

            <FaGraduationCap className="featureIcon"/>

            <h3>Smart Learning</h3>

            <p>
              AI generated learning paths,
              certifications and personalized
              progress tracking.
            </p>

          </div>

          <div className="featureCard">

            <FaUsers className="featureIcon"/>

            <h3>Workforce</h3>

            <p>
              Attendance, performance,
              employee training and
              collaborative workspace.
            </p>

          </div>

          <div className="featureCard">

            <FaBrain className="featureIcon"/>

            <h3>AI Assistant</h3>

            <p>
              Resume analysis,
              interview preparation
              and skill recommendations.
            </p>

          </div>

          <div className="featureCard">

              <FaTrophy className="featureIcon" />

              <h3>Gamification</h3>

              <p>
                  Earn XP, badges, achievements and climb
                  leaderboards while learning and completing tasks.
              </p>

          </div>

          <div className="featureCard">

              <FaChartLine className="featureIcon" />

              <h3>Progress Tracking</h3>

              <p>
                  Monitor course completion, employee productivity,
                  skill growth and performance through smart dashboards.
              </p>

          </div>

          <div className="featureCard">

              <FaShieldAlt className="featureIcon" />

              <h3>Secure Platform</h3>

              <p>
                  Enterprise-grade security with role-based access,
                  encrypted data and protected user authentication.
              </p>

          </div>

        </div>

      </section>

      <section className="loginLock">

        <h2>
          Unlock Premium Features
        </h2>

        <p>
          Login to access AI Mentor,
          Leaderboards, Certificates,
          Workforce Analytics and
          Personalized Dashboard.
        </p>

        <button>

          Login Now

          <FaArrowRight/>

        </button>

      </section>

    </>
  );
}
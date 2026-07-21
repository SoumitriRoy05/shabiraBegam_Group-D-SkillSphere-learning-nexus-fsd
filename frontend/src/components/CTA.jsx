import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/cta.css";

export default function CTA() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    const selectionSection = document.getElementById("workspace-selection");
    if (selectionSection) {
      selectionSection.scrollIntoView({ behavior: "smooth" });
    } else if (user) {
      if (user.role === 'STUDENT') {
        navigate('/student-home');
      } else if (user.role === 'EMPLOYEE') {
        navigate('/workforce-home');
      } else {
        navigate('/register');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="cta">

      <h2>Ready to Transform Learning & Workforce Management?</h2>

      <p>
        Empower students, educators, employees, and organizations with one intelligent platform
        for learning, collaboration, and productivity.
      </p>

      <div className="ctaButtons">
        <button className="ctaBtn" onClick={handleGetStarted}>Get Started</button>
      </div>

    </section>
  );
}
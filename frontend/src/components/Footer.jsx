import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">

      <div className="footerTop">

        <div className="footerBrand">
          <h2>SkillSphere</h2>
          <p>
            Empowering students and organizations through
            gamified learning and workforce management.
          </p>
        </div>

        <div className="footerLinks">
          <h3>Quick Links</h3>

          {user && user.role === 'STUDENT' ? (
            <>
              <Link to="/student-home" onClick={handleLinkClick}>Home</Link>
              <Link to="/student-features" onClick={handleLinkClick}>Features</Link>
              <Link to="/learning" onClick={handleLinkClick}>Learning</Link>
              <Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
              <Link to="/sandbox" onClick={handleLinkClick}>Sandbox</Link>

            </>
          ) : user && user.role === 'EMPLOYEE' ? (
            <>
              <Link to="/workforce-home" onClick={handleLinkClick}>Home</Link>
              <Link to="/workforce-features" onClick={handleLinkClick}>Features</Link>
              <Link to="/workforce-dashboard" onClick={handleLinkClick}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
              <Link to="/features" onClick={handleLinkClick}>Features</Link>
              <Link to="/learning" onClick={handleLinkClick}>Learning</Link>
              <Link to="/workforce" onClick={handleLinkClick}>Workforce</Link>
              <Link to="/sandbox" onClick={handleLinkClick}>Sandbox</Link>
              <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            </>
          )}
        </div>

        <div className="footerContact">
          <h3>Connect</h3>

          <div className="socialIcons">
            <FaGithub />
            <FaLinkedin />
            <FaEnvelope />
          </div>
        </div>

      </div>

      <div className="footerBottom">
        © 2026 SkillSphere. All Rights Reserved.
      </div>

    </footer>
  );
}
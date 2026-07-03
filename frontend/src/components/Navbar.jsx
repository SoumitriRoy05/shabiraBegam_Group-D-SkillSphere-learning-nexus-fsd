import "../styles/navbar.css";
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">

        <div className="logoIcon">
          ⬢
        </div>

        <span className="skill">Skill</span>
        <span className="sphere">Sphere</span>

      </div>

      <nav className="navLinks">
          {location.pathname !== "/" }
        <Link to="/" className="backHome">
         Home
        </Link>
{/*         <a href="#">Features</a> */}
        <Link to="/features">Features</Link>

{/*         <a href="#">Learning</a> */}
        <Link to="/learning">Learning</Link>
{/*         <a href="#">Workforce</a> */}
        <Link to="/workforce">Workforce</Link>
{/*         <a href="#">Pricing</a> */}

{/*         <a href="#">Contact</a> */}
<Link to="/contact">Contact</Link>
      </nav>

      <div className="navButtons">

        <button className="xpBtn">
          ⚡ 2450 XP
        </button>

        <button className="loginBtn">
          Login
        </button>

      </div>

    </header>
  );
}
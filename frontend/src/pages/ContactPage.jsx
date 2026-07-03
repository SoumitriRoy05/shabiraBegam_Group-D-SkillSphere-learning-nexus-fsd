import "../styles/contactPage.css";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
    <Background />
      <Navbar />

      <section className="contactHero">

        <div className="contactGlow glow1"></div>
        <div className="contactGlow glow2"></div>

        <div className="contactLeft">

          <div className="contactBadge">
            📞 24×7 Support
          </div>

          <h1>
            Let's
            <span> Connect </span>
            With
            <span> SkillSphere </span>
          </h1>

          <p>
            Have questions about our learning platform or workforce
            management system? Our support team is here to help
            students, professionals and organizations.
          </p>

          <div className="contactButtons">

            <button className="primaryBtn">
              Login
            </button>

            <button className="secondaryBtn">
              Support
            </button>

          </div>

        </div>

        <div className="contactRight">

          <div className="contactCard">

            <h3>Contact Information</h3>

            <div className="cardRow">
              <FaEnvelope />
              <span>support@skillsphere.com</span>
            </div>

            <div className="cardRow">
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </div>

            <div className="cardRow">
              <FaMapMarkerAlt />
              <span>Bhubaneswar, Odisha</span>
            </div>

            <div className="cardRow">
              <FaHeadset />
              <span>24×7 Customer Support</span>
            </div>

            <button className="unlockBtn">
              Contact Support
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>

    </>
  );
}
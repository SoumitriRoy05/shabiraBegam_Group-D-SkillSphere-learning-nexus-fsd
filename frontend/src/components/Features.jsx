// import "../styles/features.css";
// import {
//   FaRobot,
//   FaGraduationCap,
//   FaChartLine,
//   FaUsers,
//   FaMedal,
//   FaBrain,
// } from "react-icons/fa";
//
// export default function Features() {
//
//   const cards = [
//     {
//       icon: <FaGraduationCap />,
//       title: "Smart Learning",
//       text: "Interactive learning paths with certifications."
//     },
//
//     {
//       icon: <FaBrain />,
//       title: "AI Assistant",
//       text: "Personal AI mentor for students and employees."
//     },
//
//     {
//       icon: <FaChartLine />,
//       title: "Analytics",
//       text: "Track progress with beautiful dashboards."
//     },
//
//     {
//       icon: <FaUsers />,
//       title: "Team Collaboration",
//       text: "Manage projects and assignments together."
//     },
//
//     {
//       icon: <FaRobot />,
//       title: "Automation",
//       text: "Attendance, reminders and smart scheduling."
//     },
//
//     {
//       icon: <FaMedal />,
//       title: "Achievements",
//       text: "XP, badges and leaderboard rewards."
//     }
//
//   ];
//
//   return (
//
// <section className="features">
//
// <h2>
//
// Powerful Platform Features
//
// </h2>
//
// <div className="featureGrid">
//
// {cards.map((card,index)=>(
//
// <div className="featureCard" key={index}>
//
// <div className="icon">
//
// {card.icon}
//
// </div>
//
// <h3>{card.title}</h3>
//
// <p>{card.text}</p>
//
// </div>
//
// ))}
//
// </div>
//
// </section>
//
//   );
//
// }

import "../styles/features.css";
import {
  FaBookOpen,
  FaTrophy,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaShieldAlt
} from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen />,
    title: "Smart Learning",
    desc: "AI-powered learning paths and interactive courses."
  },
  {
    icon: <FaTrophy />,
    title: "Gamification",
    desc: "Earn XP, badges and achievements while learning."
  },
  {
    icon: <FaChartLine />,
    title: "Progress Tracking",
    desc: "Visual dashboards to monitor your growth."
  },
  {
    icon: <FaUsers />,
    title: "Workforce Management",
    desc: "Manage employees, teams and training."
  },
  {
    icon: <FaRobot />,
    title: "AI Assistant",
    desc: "Personalized guidance powered by AI."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    desc: "Protected accounts with role-based access."
  }
];

export default function Features() {
  return (
    <section className="features">

      <h2>Why Choose SkillSphere?</h2>

      <p className="featureSub">
        Discover the future of learning and workforce management.
      </p>

      <div className="featureGrid">

        {features.map((item, index) => (

          <div className="featureCard" key={index}>

            <div className="featureIcon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

      <div className="loginCTA">

        <h3>Unlock the Complete Experience</h3>

        <p>
          Login to access dashboards, certifications,
          AI assistant, analytics, leaderboards,
          workforce tools and much more.
        </p>

        <button>Login to Continue</button>

      </div>

    </section>
  );
}
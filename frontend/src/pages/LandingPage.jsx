// import { useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Background from "../components/Background";
//
// import "../styles/landing.css";
//
// export default function LandingPage() {
//
//   useEffect(() => {
//
//     const glow = document.querySelector(".cursorGlow");
//
//     const move = (e) => {
//       glow.style.left = `${e.clientX}px`;
//       glow.style.top = `${e.clientY}px`;
//     };
//
//     window.addEventListener("mousemove", move);
//
//     return () => window.removeEventListener("mousemove", move);
//
//   }, []);
//
//   return (
//     <div className="landing">
//
//       <Background />
//
//       <div className="cursorGlow"></div>
//
//       <Navbar />
//
//       <Hero />
//
//     </div>
//   );
// }

// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Background from "../components/Background";
// import UserSelection from "../components/UserSelection";
//
// import "../styles/landing.css";
//
// export default function LandingPage() {
//   return (
//     <div className="landing">
//
//       <Background />
//
//       <Navbar />
//
//       <Hero />
//
//       <UserSelection />
//
//     </div>
//   );
// }

// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Background from "../components/Background";
// import UserSelection from "../components/UserSelection";
// import Features from "../components/Features";
// import Workforce from "../components/Workforce";
// import Stats from "../components/Stats";
//
// import "../styles/landing.css";
//
// export default function LandingPage() {
//   return (
//     <div className="landing">
//
//       <Background />
//
//       <Navbar />
//
//       <Hero />
//
//       <UserSelection />
//
//       <Features />
//
//       <Workforce />
//
//       <Stats />
//
//     </div>
//   );
// }

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Background from "../components/Background";
import UserSelection from "../components/UserSelection";
import Features from "../components/Features";
import Workforce from "../components/Workforce";
import Stats from "../components/Stats";

import Gamification from "../components/Gamification";
import Timeline from "../components/Timeline";
import Testimonials from "../components/Testimonials";
// import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

import "../styles/landing.css";

export default function LandingPage(){

return(

<div className="landing">

<Background/>

<Navbar/>

<Hero/>

<UserSelection/>

{/* <Features/> */}

{/* <Workforce/> */}

<Stats/>

<Gamification/>

<Timeline/>

<Testimonials/>

{/* <FAQ/> */}

<CTA/>

<Footer/>

</div>

)

}
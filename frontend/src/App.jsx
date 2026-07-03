// import LandingPage from "./pages/LandingPage";
//
// function App() {
//   return <LandingPage />;
// }
//
// export default App;

// import { Routes, Route } from "react-router-dom";
//
// import LandingPage from "./pages/LandingPage";
// import FeaturesPage from "./pages/FeaturePage";
// import LearningPage from "./pages/LearningPage";
// import WorkforcePage from "./pages/WorkforcePage";
// import ContactPage from "./pages/ContactPage";
//
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//
//       <Route path="/features" element={<featuresPage />} />
//
//       <Route path="/learning" element={<LearningPage />} />
//
//       <Route path="/workforce" element={<WorkforcePage />} />
//
//       <Route path="/contact" element={<ContactPage />} />
//     </Routes>
//   );
// }
//
// export default App;

import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturePage";
import LearningPage from "./pages/LearningPage";
import WorkforcePage from "./pages/WorkforcePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/features" element={<FeaturesPage />} />

      <Route path="/learning" element={<LearningPage />} />

      <Route path="/workforce" element={<WorkforcePage />} />

      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
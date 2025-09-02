import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Tip from "./components/Tip";
import Footer from "./components/Footer";
import "./App.css";
import ResumeUpload from "./components/ResumeUpload";
import PortfolioPage from "./pages/portfolios/projectManager/pages/PortfolioPage";
import PhotographerPage from "./pages/portfolios/photographer/PhotographerApp.jsx";
import ExamplePortfolios from "./components/examplePortfolios";
import DataScientistPage from "./pages/dataScientist/pages/DataScientistPage";
import SignUp from "./pages/login/SignUp";
import HandymanPage from "./pages/portfolios/handyman/HandyManPage.jsx";
import Occupations from "./components/Occupations";
import LocalVendorApp from "./pages/portfolios/localVendor/LocalVendorApp.jsx";
import CookieConsent from "./components/CookieConsent";
import { AnalyticsLoader } from "./components/AnalyticsLoader";
import CookieSettings from "./components/CookieSettings";
import TelemetryVisit from "./components/TelemetryVisit";


export default function App() {
  const [adminRequested, setAdminRequested] = useState(false);

  const handleGetStarted = () => {
    if (loggedIn) return;
    // Show tip/suggestion for plus button
  };

  const handleRequestAdmin = () => {
    setAdminRequested(true);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<About onGetStarted={handleGetStarted} />} />

        <Route
          path="/dashboard"
          element={<Dashboard onRequestAdmin={handleRequestAdmin} />}
        />

        <Route path={"/signup"} element={<SignUp />} />
        <Route path="/occupations" element={<Occupations />} />

        <Route path="/resume" element={<ResumeUpload />} />

        <Route path="/portfolios" element={<ExamplePortfolios />} />

        <Route
          path="/portfolios/project-manager/:username/:id"
          element={<PortfolioPage />}
        />

        <Route path="/portfolios/software-engineer" />
        <Route
          path="/portfolios/data-scientist/*"
          element={<DataScientistPage />}
        />
        <Route path="/portfolios/cleaning-services" />
        <Route path="/portfolios/localVendor/*" element={<LocalVendorApp />} />
        <Route
          path="/portfolios/photographer/*"
          element={<PhotographerPage />}
        />

        <Route path="/portfolios/handyman" element={<HandymanPage />} />
      </Routes>
      {adminRequested && (
        <Tip message="Request received! Our admin team will contact you shortly." />
      )}
      <Footer />
      <AnalyticsLoader />
      <CookieConsent />
      <CookieSettings />
      <TelemetryVisit />
    </Layout>
  );
}

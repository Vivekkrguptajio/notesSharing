{/* Navbar Removed (Global in App.jsx) */ }
import HeroSection from "./public/landing/HeroSection";
import QuickAccess from "./public/landing/QuickAccess";
import Feature from "./public/landing/Feature";
import Work from "./public/landing/Work";
import Footer from "../components/common/Footer";
import TopUploaders from "../components/TopUploaders";

export default function LandingPage() {
  return (
    <>
      {/* Navbar handled globally */}
      <HeroSection />
      <TopUploaders />
      <QuickAccess />
      <Feature />
      <Work />
      <Footer />
    </>
  );
}

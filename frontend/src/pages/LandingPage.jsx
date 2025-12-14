import Navbar from "../components/common/Navbar";
import HeroSection from "./public/landing/HeroSection";
import QuickAccess from "./public/landing/QuickAccess";
import Feature from "./public/landing/Feature";
import Work from "./public/landing/Work";
import Footer from "../components/common/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <QuickAccess />
      <Feature />
      <Work />
      <Footer />
    </>
  );
}

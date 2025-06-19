import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ClassesSection from "../components/ClassesSection";
import AdventuresSection from "../components/AdventuresSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AdventuresSection />
      <ClassesSection />
      <Footer />
    </div>
  );
};

export default Index;

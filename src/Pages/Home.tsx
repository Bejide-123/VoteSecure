import Navbar from "../Components/Navbar";
import HeroSection from "../Components/Hero";
import FeaturesSection from "../Components/Features";
import HowItWorksSection from "../Components/HowItWorks";
import PricingSection from "../Components/Pricing";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </>
  );
}

export default Home;
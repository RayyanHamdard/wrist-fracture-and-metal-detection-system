import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import DivWFull1 from "../components/DivWFull1";
import DevelopmentsContent from "../components/DevelopmentsContent";
import Footer from "../components/Footer";

const HomePage: FunctionComponent = () => {
  return (
    <div className="w-full bg-white flex flex-col items-end justify-start pt-0 px-0 box-border gap-0 mix-blend-normal leading-normal tracking-normal">
      <Navbar />
      <section className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full">
        <HeroSection />
        <FeaturesSection />
      </section>
      <DivWFull1 />
      <section className="self-stretch bg-gradient-to-b from-[#0a1628] to-[#0c1d33] border-t border-slate-800 box-border flex flex-col items-center justify-start py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-16 max-w-full font-dm-sans">
        <div className="w-full max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-medium text-teal-300 bg-teal-400/10 rounded-full border border-teal-400/20">
            What's New
          </span>
          <h2 className="m-0 mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400">
            Explore Our Latest Developments
          </h2>
          <p className="m-0 mb-8 sm:mb-10 text-sm sm:text-base text-slate-400 max-w-2xl">
            Real progress on our wrist fracture &amp; metal detection platform — from model performance to the clinical tools around it.
          </p>
          <DevelopmentsContent />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/NavBar";

const LandingPage = () => {
    
  return (
    <>
      <div className="landing-page w-full">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;

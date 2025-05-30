import React, { useRef } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/NavBar";
import Testimonials from "@components/Testimonials";
import Pricing from "@components/Pricing";
import CTA from "@components/CTA";
import { useInView, motion } from "framer-motion";

const Section = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100vh" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="landing-page w-full"
    >
      <Navbar />
      <Section>
        <Hero />
      </Section>
      <Section>
        <Features />
      </Section>
      <Section>
        <Testimonials />
      </Section>
      <Section>
        <Pricing />
      </Section>
      <Section>
        <CTA />
      </Section>
      <Section>
        <Footer />
      </Section>
    </motion.div>
  );
};

export default LandingPage;

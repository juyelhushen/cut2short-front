import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import c2sLogo from "../assets/c2s-logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full px-4 md:px-20 fixed top-0 z-10 transition-colors duration-300 ${
        isScrolled ? "bg-teal-900 shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-teal-600 flex items-center h-12">
          <img src={c2sLogo} alt="C2S Logo" className="h-full object-contain" />
        </div>
        <nav className="hidden md:flex space-x-6">
          {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`${
                isScrolled ? "text-white" : "text-gray-600"
              } hover:text-teal-600 transition-colors duration-300`}
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <div className="flex space-x-4">
          <motion.button
            onClick={() => navigate("/login")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              isScrolled
                ? "border-white text-white hover:bg-teal-800/30"
                : "border-teal-600 text-teal-600 hover:bg-teal-100/50"
            } transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Login"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Login</span>
          </motion.button>
          <motion.button
            onClick={() => navigate("/signup")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isScrolled
                ? "bg-white text-teal-900 hover:bg-gray-100"
                : "bg-gradient-to-r from-coral-500 to-teal-600 text-white hover:from-coral-600 hover:to-teal-700"
            } shadow-md transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sign Up"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
            <span>Sign Up</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

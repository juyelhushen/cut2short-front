import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/c2s-logo.png";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-teal-600 to-coral-500"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100vh" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.img
        src={logo}
        alt="Cut2Short Logo"
        className="h-16 md:h-24 object-contain"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
};

export default LoadingScreen;

import React from "react";
import { useNavigate } from "react-router-dom";
import c2sLogo from "../assets/c2s-logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-20 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-blue-600 flex items-center h-10"> {/* Added flex and items-center and fixed height */}
          <img
            src={c2sLogo}
            alt="C2S Logo"
            className="h-full object-contain" /* Changed from max-h-10 to h-full */
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
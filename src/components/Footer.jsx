import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="mb-4">&copy; 2025 Cut2Short. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            Facebook
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

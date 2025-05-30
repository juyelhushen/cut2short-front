import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
      return (
        <motion.footer
          id="contact"
          className="w-full bg-gray-900 text-white py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <p className="text-gray-300 mb-6">Have questions? Reach out at <a href="mailto:support@cut2short.com" className="underline hover:text-teal-400">support@cut2short.com</a></p>
            <p className="mb-4">© 2025 Cut2Short. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="hover:text-teal-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.footer>
      );
    };

export default Footer;

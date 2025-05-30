import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

 const CTA = () => {
      const navigate = useNavigate();
      return (
        <section className="w-full px-4 md:px-20 py-16 text-center bg-gradient-to-r from-coral-500 to-coral-600">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start Shortening Your Links Today
            </motion.h2>
            <motion.p
              className="text-gray-100 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join thousands of users who trust Cut2Short to simplify their links and boost engagement.
            </motion.p>
            <motion.button
              onClick={() => navigate("/signup")}
              className="bg-white text-coral-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.button>
          </motion.div>
        </section>
      );
    };

export default CTA

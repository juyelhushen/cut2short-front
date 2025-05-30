import React, { useState } from "react";
import { makeShort } from "../services/UrlService";
import { motion } from "framer-motion";

const Hero = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const makeShort = async (payload) => {
    return {
      success: true,
      data: {
        shortenUrl: `https://c2s.link/${Math.random()
          .toString(36)
          .substring(7)}`,
      },
    };
  };

  const handleUrlShortClick = async () => {
    try {
      const payload = { originalUrl: inputUrl };
      const response = await makeShort(payload);
      if (response.success) {
        setShortenedUrl(response.data.shortenUrl);
      }
    } catch (error) {
      console.error("error : ", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <section className="w-full px-4 md:px-20 py-32 text-center bg-gradient-to-r from-teal-600 to-teal-800">
      <motion.div className="max-w-5xl mx-auto px-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Shorten Your Links, Amplify Your Reach
        </motion.h1>
        <motion.p
          className="text-gray-100 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Create short, shareable links with advanced analytics to track
          performance and engage your audience effectively.
        </motion.p>
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste a long URL to shorten..."
              className="w-full sm:w-3/4 px-4 py-3 border rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <motion.button
              onClick={handleUrlShortClick}
              className="w-full sm:w-1/4 bg-coral-500 text-white px-4 py-3 rounded-r-md hover:bg-coral-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Shorten
            </motion.button>
          </div>
          {shortenedUrl && (
            <motion.div
              className="mt-6 p-4 bg-teal-50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-teal-800 font-semibold mb-2">Shortened URL:</p>
              <div className="flex items-center space-x-4">
                <span className="text-teal-700">{shortenedUrl}</span>
                <motion.button
                  onClick={copyToClipboard}
                  className="text-coral-500 hover:text-coral-700"
                  whileHover={{ scale: 1.1 }}
                >
                  Copy
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

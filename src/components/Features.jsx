import React from "react";
import { motion } from "framer-motion";
const Features = () => {
  const features = [
    {
      title: "Instant Link Shortening",
      description:
        "Transform long URLs into concise, shareable links in seconds.",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Monitor clicks, locations, and engagement with detailed insights.",
    },
    {
      title: "Custom Integrations",
      description: "Seamlessly connect with your favorite tools and platforms.",
    },
    {
      title: "Branded Links",
      description:
        "Create custom short URLs with your brand for trust and recognition.",
    },
  ];

  return (
    <section id="features" className="w-full px-4 md:px-20 bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Cut2Short Stands Out
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Cut2Short empowers you to create, manage, and track links with ease,
          helping you connect with your audience like never before.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white shadow-lg p-6 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
            >
              <h3 className="text-lg font-bold text-teal-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

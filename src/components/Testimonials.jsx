import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Digital Marketer",
      quote:
        "Cut2Short has transformed how I share links. The analytics are a game-changer!",
    },
    {
      name: "John D.",
      role: "Small Business Owner",
      quote:
        "Branded links make my business look professional, and the dashboard is so easy to use.",
    },
    {
      name: "Emily R.",
      role: "Content Creator",
      quote:
        "I love how quickly I can shorten links and track their performance. Highly recommend!",
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full px-4 md:px-20 bg-teal-100 py-16"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white shadow-lg p-6 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-teal-600 font-semibold">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

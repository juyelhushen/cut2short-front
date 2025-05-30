import React from "react";
import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0/mo",
      features: ["Unlimited Short Links", "Basic Analytics", "Email Support"],
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      features: [
        "Branded Links",
        "Advanced Analytics",
        "Priority Support",
        "API Access",
      ],
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: [
        "Custom Domains",
        "Team Accounts",
        "Dedicated Support",
        "Custom Integrations",
      ],
    },
  ];

  return (
    <section id="pricing" className="w-full px-4 md:px-20 bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose a plan that fits your needs, from free to enterprise-level
          solutions.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-white shadow-lg p-6 rounded-lg border-t-4 border-teal-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-2xl font-semibold text-coral-500 mb-4">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="mb-2">
                    • {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from "react";
import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const MainContent = () => {
  return (
    <motion.main
      className="p-4 bg-gray-100 flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">
            Welcome to the Dashboard!
          </h1>
          <p className="text-gray-700">
            Here you can manage your content, check analytics, and much
            more. Let’s get started!
          </p>
        </CardContent>
      </Card>
    </motion.main>
  );
};

export default MainContent;

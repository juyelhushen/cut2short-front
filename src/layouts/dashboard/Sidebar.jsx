import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  LinkIcon,
  QrCodeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <motion.aside
      className="bg-white h-screen shadow-md flex flex-col p-3 border-r border-gray-200"
      initial={{ width: isOpen ? 250 : 80 }}
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-blue-500"
      >
        {isOpen ? "←" : "→"}
      </button>

      <button className="bg-blue-700 text-white py-3 px-4 my-3 border-none font-bold flex flex-row justify-center">
        <AddIcon />
        {isOpen && <span className="ml-3">Create New</span>}
      </button>

      <Divider sx={{marginY:'8px'}} className="bg-gray-300" />

      <nav className="flex flex-col space-y-2">
        {[
          { name: "Home", icon: <HomeIcon className="w-5 h-5" />, path: "/dashboard/home" },
          { name: "Links", icon: <LinkIcon className="w-5 h-5" />, path: "/dashboard/links" },
          { name: "QR Codes", icon: <QrCodeIcon className="w-5 h-5" />, path: "/dashboard/qrcodes" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 rounded-md ${
              activeItem === item.name ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => handleItemClick(item.name)}
          >
            {item.icon}
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}

        <Divider className="bg-gray-300" />

        {[
          { name: "Analytics", icon: <ChartBarIcon className="w-5 h-5" />, path: "/dashboard/analytics" },
          { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" />, path: "/dashboard/settings" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 rounded-md ${
              activeItem === item.name ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => handleItemClick(item.name)}
          >
            {item.icon}
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

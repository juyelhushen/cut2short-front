import React, { useState } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Close as CloseIcon, Menu as MenuIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  Home as HomeIcon,
  Link as LinkIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <motion.aside
      className="bg-gray-800 text-white flex flex-col"
      initial={{ width: 256 }}
      animate={{ width: isSidebarOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xl font-bold p-4 border-b border-gray-700 flex justify-between">
        <span className="text-lg">{isSidebarOpen ? "Dashboard" : null}</span>
        <IconButton
          onClick={() => toggleSidebar(!isSidebarOpen)}
          color="inherit"
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <List>
        <ListItem
          button
          className={`${
            activeItem === "Home" ? "bg-gray-700 text-blue-500, rounded-sm " : ""
          } hover:bg-gray-500 hover:text-blue-500 hover:cursor-pointer `}
          onClick={() => handleItemClick("Home")}
        >
          <HomeIcon sx={{ mr: 2 }} />
          {isSidebarOpen && <ListItemText primary="Home" />}
        </ListItem>

        <ListItem
          button
          className={`${
            activeItem === "Links" ? "bg-gray-700 text-blue-500" : ""
          } hover:bg-gray-500 hover:text-blue-500 hover:cursor-pointer`}
          onClick={() => handleItemClick("Links")}
        >
          <LinkIcon sx={{ mr: 2 }} />
          {isSidebarOpen && <ListItemText primary="Links" />}
        </ListItem>
        <Divider className="my-3 bg-gray-700" />
        <ListItem
          button
          className={`${
            activeItem === "Settings" ? "bg-gray-700 text-blue-500" : ""
          } hover:bg-gray-500 hover:text-blue-500 hover:cursor-pointer`}
          onClick={() => handleItemClick("Settings")}
        >
          <SettingsIcon sx={{ mr: 2 }} />
          {isSidebarOpen && <ListItemText primary="Settings" />}
        </ListItem>
      </List>
    </motion.aside>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Card, CardContent } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import MainContent from "./MainContent ";
import Sidebar from "./SideBar";
import TopBar from "./Topbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = (state) => {
    setIsSidebarOpen(state);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
};

export default DashboardLayout;

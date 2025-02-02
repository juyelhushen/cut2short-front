import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./dashboard/Topbar";
import Sidebar from "./dashboard/SideBar";
import Home from "../modules/dashboard/Home";
import Links from "../modules/dashboard/Links";
import QRCode from "../modules/dashboard/QRCode";
import MainContent from "./dashboard/MainContent ";


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = (state) => {
    setIsSidebarOpen(state);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
      <div className="relative z-10 overflow-hidden">
          <TopBar />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="links" element={<Links />} />
          <Route path="qrcodes" element={<QRCode />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;

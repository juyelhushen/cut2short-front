import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./dashboard/Topbar";
import Home from "../modules/dashboard/Home";
import Links from "../modules/dashboard/Links";
import QRCode from "../modules/dashboard/QRCode";
import MainContent from "./dashboard/MainContent ";
import CreateOrUpdateUrl from "../components/CreateOrUpdateUrl";
import Sidebar from "./dashboard/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <div className="relative z-10 overflow-hidden">
          <TopBar />
        </div>
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="links">
              <Route index element={<Links />} />
              <Route path="create" element={<CreateOrUpdateUrl />} />
              <Route path="edit/:id" element={<CreateOrUpdateUrl />} />
            </Route>
            <Route path="qrcodes" element={<QRCode />} />
            <Route path="*" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

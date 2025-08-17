import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import TopBar from "./dashboard/Topbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "/src/modules/dashboard/Home";
import Links from "/src/modules/dashboard/Links";
import CreateOrUpdateUrl from "@components/CreateOrUpdateUrl";
import QRCode from "/src/modules/dashboard/QRCode";
import GenerateQRForm from "@components/GenerateQRForm";
import MainContent from "./dashboard/MainContent ";

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
            <Route index element={<Navigate to="/dashboard/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="links">
              <Route index element={<Links />} />
              <Route path="create" element={<CreateOrUpdateUrl />} />
              <Route path="edit/:id" element={<CreateOrUpdateUrl />} />
            </Route>
            <Route path="qrcodes">
              <Route index element={<QRCode />} />
              <Route path="create" element={<GenerateQRForm />} />
            </Route>
            <Route path="*" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

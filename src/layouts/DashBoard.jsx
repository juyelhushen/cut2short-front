import React, { lazy, Suspense, useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import TopBar from "./dashboard/Topbar";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContent from "./dashboard/MainContent ";
import useLoading from "/src/hooks/useLoading";

const Home = lazy(() => import("/src/modules/dashboard/Home"));
const Links = lazy(() => import("/src/modules/dashboard/Links"));
const CreateOrUpdateUrl = lazy(() => import("@components/CreateOrUpdateUrl"));
const QRCode = lazy(() => import("/src/modules/dashboard/QRCode"));
const GenerateQRForm = lazy(() => import("@components/GenerateQRForm"));

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const { LoadingComponent } = useLoading();


  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <div className="relative z-10 overflow-hidden">
          <TopBar />
        </div>
        <div className="flex-1 overflow-auto">
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route
                index
                element={<Navigate to="/dashboard/home" replace />}
              />
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
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

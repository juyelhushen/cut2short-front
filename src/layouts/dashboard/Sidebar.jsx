import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  LinkIcon,
  QrCodeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import chainIcon from "../../assets/chain.png";
import CreateDialog from "./CreateDialog";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { name, profile, email } = useSelector((state) => state.userData);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [openDialog, setOpenDialog] = useState(false);

  // Determine active item based on current route
  const getActiveItem = () => {

    const path = location.pathname;
    if (path.includes("home")) return "Home";
    if (path.includes("links")) return "Links";
    if (path.includes("qrcodes")) return "QR Codes";
    if (path.includes("analytics")) return "Analytics";
    if (path.includes("settings")) return "Settings";
    return "Home";
  };

  const activeItem = getActiveItem();

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      path: "/dashboard/home",
    },
    {
      name: "Links",
      icon: <LinkIcon className="w-5 h-5" />,
      path: "/dashboard/links",
    },
    {
      name: "QR Codes",
      icon: <QrCodeIcon className="w-5 h-5" />,
      path: "/dashboard/qrcodes",
    },
  ];

  const secondaryItems = [
    {
      name: "Analytics",
      icon: <ChartBarIcon className="w-5 h-5" />,
      path: "/dashboard/analytics",
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <>
      <motion.aside
        className="bg-white h-screen shadow-lg flex flex-col border-r border-gray-200"
        initial={{ width: isOpen ? 250 : 80 }}
        animate={{ width: isOpen ? 250 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <Box className="p-4 flex items-center justify-between border-b border-gray-100">
          {isOpen ? (
            <Box className="flex items-center">
              <img src={chainIcon} alt="Chain Icon" className="w-8 h-8 mr-2" />
              <Typography variant="h6" className="font-bold text-gray-800">
                C2S
              </Typography>
            </Box>
          ) : (
            <img src={chainIcon} alt="Chain Icon" className="w-8 h-8 mx-auto" />
          )}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="min-w-0 p-1 rounded-full"
            sx={{
              color: "grey.700",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
          >
            {isOpen ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </Button>
        </Box>

        {/* Create New Button */}
        <Box className="p-3">
          <Button
            onClick={() => setOpenDialog(true)}
            variant="contained"
            fullWidth
            className="py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
              },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            <PlusIcon className="w-5 h-5" />
            {isOpen && <span className="ml-2">Create New</span>}
          </Button>
        </Box>

        <Divider className="bg-gray-200" />

        {/* Navigation Items */}
        <nav className="flex flex-col p-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-3 rounded-lg mb-1 transition-all duration-200 ${
                activeItem === item.name
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Box
                className={`flex items-center justify-center ${
                  activeItem === item.name ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.icon}
              </Box>
              {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </Link>
          ))}

          <Box className="mt-auto">
            <Divider className="my-4 bg-gray-200" />

            {secondaryItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-3 rounded-lg mb-1 transition-all duration-200 ${
                  activeItem === item.name
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Box
                  className={`flex items-center justify-center ${
                    activeItem === item.name ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </Box>
                {isOpen && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </Box>
        </nav>

        {/* User profile section (optional) */}
        {isOpen && (
          <Box className="p-3 border-t border-gray-200">
            <Box className="flex items-center p-2">
              <Box className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Typography
                  variant="body2"
                  className="text-blue-600 font-medium"
                >
                  U
                </Typography>
              </Box>
              <Box className="ml-3">
                <Typography
                  variant="body2"
                  className="font-medium text-gray-800"
                >
                  {name}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {email}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </motion.aside>

      <CreateDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default Sidebar;

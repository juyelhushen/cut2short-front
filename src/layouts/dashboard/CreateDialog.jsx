import React, { useState } from "react";

import InsertLinkIcon from "@mui/icons-material/InsertLink";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import DnsIcon from "@mui/icons-material/Dns"; // Landing page icon
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";


const CreateDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const options = [
    {
      title: "Shorten a link",
      icon: <InsertLinkIcon className="text-blue-600" />,
      path: "/dashboard/links/create",
    },
    {
      title: "Create a QR Code",
      icon: <QrCode2Icon className="text-orange-500" />,
      path: "/dashboard/qrcodes/create",
    },
    {
      title: "Build a landing page",
      icon: <DnsIcon className="text-purple-600" />,
      path: "/dashboard/landingpage/create",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-[40px]",
      }}
    >
      <div className="p-6 w-full relative">
        <div className='flex flex-row justify-between content-center'>
          <h2 className="text-2xl font-bold mb-6">
            What do you want to create?
          </h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="grid grid-cols-3 gap-4 h-auto">
          {options.map((opt) => (
            <div
              key={opt.title}
              onClick={() => handleNavigate(opt.path)}
              className="border p-5 rounded-xl hover:shadow-md cursor-pointer flex flex-col items-center text-center min-h-[120px]"
            >
              <div className="mb-3 text-3xl">{opt.icon}</div>
              <p className="font-medium text-sm">{opt.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default CreateDialog;

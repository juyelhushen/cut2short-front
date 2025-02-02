import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar>
        <div className="flex-1 text-center text-white text-xl font-semibold">
          My Dashboard
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

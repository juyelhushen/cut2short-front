
import React from "react";
import { AppBar, Toolbar, InputBase, Avatar, Typography, Box } from "@mui/material";
import { Search as SearchIcon, AccountCircle } from "@mui/icons-material";

const TopBar = () => {
  const user = {
    name: "John Doe",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTbaYH9ZesQBA8DVeUu5aHf1XApQb6NA_hXFc-kH80pIeE8DXg9RHIxL6Dnjn-zNRFGVFgA&s"
  };

  return (
    <AppBar position="sticky" className="shadow-md" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <SearchIcon className="text-gray-500" />
          <InputBase
            placeholder="Search…"
            className="ml-2 outline-none"
          />
        </Box>

        <Box className="flex items-center space-x-3">
          <Typography variant="body1" className="font-medium text-gray-700">
            {user.name}
          </Typography>

          {user.profilePic ? (
            <Avatar src={user.profilePic} className="w-10 h-10" />
          ) : (
            <AccountCircle className="w-10 h-10 text-gray-600" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

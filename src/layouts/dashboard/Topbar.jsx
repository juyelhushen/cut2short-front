
import React from "react";
import { AppBar, Toolbar, InputBase, Avatar, Typography, Box, Divider, MenuItem, ListItemIcon, Menu } from "@mui/material";
import { Search as SearchIcon, AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TopBar = () => {

  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTbaYH9ZesQBA8DVeUu5aHf1XApQb6NA_hXFc-kH80pIeE8DXg9RHIxL6Dnjn-zNRFGVFgA&s"
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

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

        <Box onClick={handleClick} className="flex items-center space-x-3">
          <Typography variant="body1" className="font-medium text-gray-700">
            {user.name}
          </Typography>

          {user.profilePic ? (
            <Avatar src={user.profilePic} className="w-10 h-10" />
          ) : (
            <AccountCircle className="w-10 h-10 text-gray-600" />
          )}
        </Box>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

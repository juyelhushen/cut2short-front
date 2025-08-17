import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Avatar,
  Typography,
  Box,
  Divider,
  MenuItem,
  ListItemIcon,
  Menu,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "/src/store/slices/authSlice";
import { clearSeassionCookie } from "/src/services/UserService";

const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, profile } = useSelector((state) => state.userData);

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (profile && typeof profile === "string" && profile.trim() !== "") {
      const img = new Image();
      img.src = profile;
      img.onload = () => setImageSrc(profile);
      img.onerror = () => console.error("Image load failed:", profile);
    }
  }, [profile]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  console.log("profile", profile);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await clearSeassionCookie();
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      className="shadow-md"
      sx={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <SearchIcon className="text-gray-500" />
          <InputBase placeholder="Search…" className="ml-2 outline-none" />
        </Box>

        <Box onClick={handleClick} className="flex items-center space-x-3">
          <Typography variant="body1" className="font-medium text-gray-700">
            {name}
          </Typography>

          {imageSrc ? (
            <Avatar
              src={imageSrc}
              className="w-10 h-10"
              onError={(e) =>
                console.error("Avatar load error:", e, "URL:", imageSrc)
              }
            />
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
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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

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
  IconButton,
  Badge,
  alpha,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccountCircle,
  Logout,
  Settings,
  NotificationsNone,
  EmailOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "/src/store/slices/authSlice";
import { clearSeassionCookie } from "/src/services/UserService";

// Styled components for better customization
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[500],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "300px",
    },
  },
}));

const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, profile, email } = useSelector((state) => state.userData);

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
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "70px !important",
        }}
      >
        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Right side icons and user profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" sx={{ color: "text.secondary" }}>
            <Badge badgeContent={4} color="error">
              <EmailOutlined />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{ color: "text.secondary" }}>
            <Badge badgeContent={2} color="error">
              <NotificationsNone />
            </Badge>
          </IconButton>

          <Box
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: 1,
              p: 1,
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "text.primary",
                display: { xs: "none", md: "block" },
              }}
            >
              {name}
            </Typography>

            {imageSrc ? (
              <Avatar
                src={imageSrc}
                sx={{ width: 36, height: 36 }}
                onError={(e) =>
                  console.error("Avatar load error:", e, "URL:", imageSrc)
                }
              />
            ) : (
              <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main" }}>
                <AccountCircle />
              </Avatar>
            )}
          </Box>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: "visible",
              mt: 1.5,
              minWidth: 200,
              "& .MuiMenuItem-root": {
                py: 1.5,
                "&:active": {
                  backgroundColor: "action.selected",
                },
              },
              "&:before": {
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
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => navigate("/dashboard/profile")}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
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

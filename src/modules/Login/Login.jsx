import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
  FormControl,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../services/UserService";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../auth/AuthProvider";
import loginImage from "../../assets/loginimg.png";
import { motion } from "framer-motion";
import linkIcon from "../../assets/whiteLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(location.state?.error || "");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      const response = await signin(formData, dispatch);
      if (response?.success) {
        login(response.data);
        navigate(location.state?.from?.pathname || "/dashboard");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
  };

  const handleGithubLogin = () => {
    window.location.href = import.meta.env.VITE_GITHUB_OAUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_URL;
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #0f172a, #1e3a8a, #2563eb)",
        overflow: "auto",
      }}
    >
      {/* Logo - Mobile */}
      {isMobile && (
        <Box
          position="absolute"
          top={10}
          right={15}
          display="flex"
          alignItems="center"
          zIndex={10}
          sx={{
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={linkIcon}
            alt="C2S logo"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        </Box>
      )}

      {/* Left Section - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "100%",
            maxWidth: "50%",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            color: "white",
          }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{
              width: "80%",
              maxWidth: "500px",
              marginBottom: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 0 25px rgba(255,255,255,0.1)",
            }}
          />
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
            Manage your product URLs in one place.
          </Typography>
          <Typography variant="body1" sx={{ color: "#cbd5e1" }} textAlign="center">
            Shorten, analyze, and control with ease.
          </Typography>
        </motion.div>
      )}

      {/* Right Section */}
      <Box
        width={{ xs: "100%", md: "50%" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ xs: 2, sm: 4 }}
        minHeight={{ xs: "100vh", md: "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", maxWidth: 460 }}
        >
          <Paper
            elevation={isMobile ? 0 : 6}
            sx={{
              width: "100%",
              padding: isMobile ? 3 : 4,
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              backgroundColor: isMobile ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: isMobile ? "none" : "0 8px 32px rgba(31, 38, 135, 0.37)",
              color: "white",
            }}
          >
            {/* Logo - Desktop */}
            {!isMobile && (
              <Box
                display="flex"
                justifyContent="center"
                mb={3}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src={linkIcon}
                  alt="C2S logo"
                  style={{ width: 80, height: 80 }}
                />
              </Box>
            )}

            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              textAlign="center"
              mb={3}
            >
              Welcome back 👋
            </Typography>

            {error && (
              <Typography color="error" textAlign="center" mb={2}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              onClick={handleGoogleLogin}
              sx={{
                mb: 1,
                color: "white",
                borderColor: "#e5e7eb",
                "&:hover": { borderColor: "white" },
                py: isMobile ? 1 : 1.5,
              }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaGithub />}
              onClick={handleGithubLogin}
              sx={{
                mb: 3,
                color: "white",
                borderColor: "#e5e7eb",
                "&:hover": { borderColor: "white" },
                py: isMobile ? 1 : 1.5,
              }}
            >
              Sign in with GitHub
            </Button>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }}>
              <Typography variant="caption" color="#cbd5e1">
                or
              </Typography>
            </Divider>

            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                size="small"
                margin="normal"
                sx={{ 
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                InputLabelProps={{ style: { color: "#cbd5e1" } }}
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                size="small"
                margin="normal"
                sx={{ 
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      onClick={handleClickShowPassword} 
                      edge="end"
                      sx={{ color: "#cbd5e1" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              <Button
                variant="contained"
                onClick={handleSignIn}
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  py: isMobile ? 1 : 1.5,
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                Sign in
              </Button>

              <Typography
                variant="body2"
                textAlign="center"
                mt={2}
                sx={{ color: "#cbd5e1" }}
              >
                Don't have an account?{" "}
                <span 
                  style={{ 
                    color: "#3b82f6", 
                    cursor: "pointer",
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    }
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </Typography>
            </FormControl>

            <Typography
              variant="caption"
              display="block"
              mt={3}
              textAlign="center"
              sx={{ color: "#94a3b8" }}
            >
              By signing in, you agree to our{" "}
              <span style={{ 
                textDecoration: "underline", 
                cursor: "pointer",
                color: "#e2e8f0"
              }}>
                Terms
              </span>{" "}
              &{" "}
              <span style={{ 
                textDecoration: "underline", 
                cursor: "pointer",
                color: "#e2e8f0"
              }}>
                Privacy Policy
              </span>
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Login;
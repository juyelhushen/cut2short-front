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

  const handleGoogleLogin = () => {
    window.location.href =
      "https://cut2short-backend.onrender.com/oauth2/authorization/google";
  };

  // const handleGithubLogin = () => {
  //   window.location.href =
  //     "https://cut2short-backend.onrender.com/oauth2/authorization/github";
  // };

  //   const handleGoogleLogin = () => {
  //   window.location.href =
  //     "http://localhost:8080/oauth2/authorization/google";
  // };

  const handleGithubLogin = () => {
    window.location.href =
      "https://cut2short-backend.onrender.com/oauth2/authorization/github";
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      height="100vh"
      sx={{
        background:
          "linear-gradient(to bottom right, #0f172a, #1e3a8a, #2563eb)",
        overflow: "hidden",
      }}
    >
      <Box
        position="absolute"
        top={20}
        right={30}
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
          style={{ width: 80, height: 80, marginRight: 8 }}
        />
      </Box>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "50%",
          padding: "4rem 2rem",
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
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Manage your product URLs in one place.
        </Typography>
        <Typography variant="body1" sx={{ color: "#cbd5e1" }}>
          Shorten, analyze, and control with ease.
        </Typography>
      </motion.div>

      {/* Right Section */}
      <Box
        width={{ xs: "100%", md: "50%" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={6}
            sx={{
              maxWidth: 460,
              padding: 4,
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={3}
            >
              Welcome back 👋
            </Typography>

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
              }}
            >
              Sign in with GitHub
            </Button>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }}>
              or
            </Divider>

            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                size="small"
                margin="normal"
                sx={{ input: { color: "white" } }}
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
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              <Button
                variant="contained"
                onClick={handleSignIn}
                sx={{
                  mt: 3,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                Sign in
              </Button>
            </FormControl>

            <Typography
              variant="caption"
              display="block"
              mt={2}
              textAlign="center"
            >
              By signing in, you agree to our{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Terms
              </span>{" "}
              &{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Privacy Policy
              </span>
              .
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Login;

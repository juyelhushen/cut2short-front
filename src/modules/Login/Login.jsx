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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../services/UserService";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    try {
      const response = await signin(formData, dispatch);
      if (response.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      throw new Error("error", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    console.log('juyal')

  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };


  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      height="100vh"
      p={4}
      sx={{
        background:
          "linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)",
      }}
    >
      {/* Left Section */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign={{ xs: "center", md: "left" }}
        px={{ xs: 4, md: 10 }}
        width={{ xs: "100%", md: "50%" }}
        color="white"
      >
        <Typography variant="h2" fontWeight="bold" mb={2}>
          The best Platform for your product urls to manage.
        </Typography>
        <Typography variant="body1" sx={{ color: "#b0c4de" }}>
          Simplify your links and engage your audience with advanced analytics.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={{ xs: "100%", md: "50%" }}
        position="relative"
      >
        {/* Background Circles */}
        <Box
          sx={{
            position: "absolute",
            width: "10rem",
            height: "10rem",
            borderRadius: "50%",
            backgroundColor: "#2563eb",
            opacity: 0.3,
            filter: "blur(20px)",
            top: "-2rem",
            left: "-2rem",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "14rem",
            height: "14rem",
            borderRadius: "50%",
            backgroundColor: "#1d4ed8",
            opacity: 0.3,
            filter: "blur(30px)",
            top: "5rem",
            right: "-2rem",
          }}
        />

        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: "500px",
            padding: 4,
            zIndex: 1,
            borderRadius: "12px",
          }}
        >
          <Box margin={"10px"}>
            <Typography variant="h5" fontWeight="bold" textAlign={"center"}>
              Signin 
            </Typography>
          </Box>
          <Box mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{ marginBottom: 1 }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaGithub />}
              sx={{ color: "black", borderColor: "black" }}
              onClick={handleGithubLogin}
            >
              Sign in with GitHub
            </Button>
          </Box>

          <Divider sx={{ marginY: 3 }}>or</Divider>

          <FormControl className="w-full">
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              placeholder="your@mail.com"
              name="email"
              value={formData.email}
              size="small"
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                "&:hover": { backgroundColor: "#1e40af" },
                marginTop: 3,
              }}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </FormControl>
          <Box textAlign={"start"} marginTop={"10px"}>
            <Typography sx={{ fontSize: "10px" }}>
              By creating an account, you agree to C2S's{" "}
              <span className="font-bold underline cursor-pointer">
                Terms of Service
              </span>
              ,
              <span className="font-bold underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="font-bold underline cursor-pointer">
                Acceptable Use Policy
              </span>
              .
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

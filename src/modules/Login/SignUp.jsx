import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FcGoogle } from "react-icons/fc"; // Import the Google icon
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa"; // Other icons
import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../services/UserService";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSignUp = async () => {
    try {
      const response = await signup(formData, dispatch);
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

  console.log("data", formData);

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
          The best offer for your business
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
            <Typography variant="h5" fontWeight="bold" textAlign={"start"}>
              Create your account
            </Typography>
            <Typography textAlign={"start"}>
              Already have an account?{" "}
              <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>{" "}
              here
            </Typography>
          </Box>
          <Box mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{ marginBottom: 1 }}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaGithub />}
              sx={{ color: "black", borderColor: "black" }}
            >
              Sign up with GitHub
            </Button>
          </Box>

          <Divider sx={{ marginY: 3 }}>or</Divider>

          <FormControl>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                size="small"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                size="small"
                onChange={handleInputChange}
              />
            </Box>
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
              onClick={handleSignUp}
            >
              Sign Up
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

export default SignUp;

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from "@mui/icons-material/Google";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "credentials", name: "Email and Password" },
];

const Login = () => {
  const handleProviderSignIn = (provider) => {
    console.log(`Signing in with ${provider}`);
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    console.log("Email and Password Sign-In");
  };

  return (
    <>
      <Box
        sx={{
          width: 400,
          margin: "auto",
          marginTop: 10,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Sign in
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 4 }}>
          Welcome, please sign in to continue
        </Typography>

        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => handleProviderSignIn("GitHub")}
          sx={{ width: "100%", marginBottom: 2 }}
        >
          Sign In With GitHub
        </Button>

        {/* Google Sign-In */}
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => handleProviderSignIn("Google")}
          sx={{ width: "100%", marginBottom: 2 }}
        >
          Sign In With Google
        </Button>

        <Divider sx={{ marginY: 3 }}>or</Divider>

        <Box
          component="form"
          onSubmit={handleEmailSignIn}
          sx={{ textAlign: "left" }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ marginBottom: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;

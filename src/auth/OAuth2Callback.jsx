import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "./AuthProvider";

// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://cut2short-backend.onrender.com";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const { login, LoadingComponent } = useAuth();

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/oauth2/callback`, {
        withCredentials: true,
      });

      const { userId, name, username, token, profile } = response.data.data;
      login({ userId, name, username, token, profile });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during OAuth2 callback:", error);
      navigate("/login", {
        state: { error: "OAuth login failed. Please try again." },
      });
    }
  };

  return <LoadingComponent />;
};

export default OAuth2Callback;

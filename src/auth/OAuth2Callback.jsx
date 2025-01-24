import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleGoogleCallback } from "../services/UserService";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchToken();
  }, [navigate, location]);

  const fetchToken = async () => {
    try {
      const token = await handleGoogleCallback();
      console.log("tokemn",token);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error during OAuth2 callback:", error);
      navigate("/login");
    }
  };

  return <div>Loading...</div>;
};

export default OAuth2Callback;

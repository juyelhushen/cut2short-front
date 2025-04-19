import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "./AuthProvider";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, LoadingComponent } = useAuth();

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/oauth2/callback", { withCredentials: true })
  //     .then((response) => {
  //       console.log("response", response.data);

  //       const { userId, name, username, token } = response.data.data;

  //       localStorage.setItem("userId", userId);
  //       localStorage.setItem("name", name);
  //       localStorage.setItem("username", username);
  //       localStorage.setItem("token", token);

  //       dispatch(
  //         setUserData({
  //           userId:userId,
  //           name: name,
  //           username: username,
  //           token: token,
  //         })
  //       );
  //       navigate("/dashboard");
  //     })
  //     .catch((error) => {
  //       console.error("Error during OAuth2 callback:", error);
  //     });
  // }, []);

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/oauth2/callback",
        { withCredentials: true }
      );

      const { userId, name, username, token } = response.data.data;
      login({ userId, name, username, token });
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

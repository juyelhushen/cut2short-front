import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/loginCred/LoginSlice";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/oauth2/callback", { withCredentials: true })
      .then((response) => {
        console.log("response", response.data);

        const { name, username, token } = response.data.data;

        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);

        dispatch(
          setUserData({
            name: name,
            username: username,
            token: token,
          })
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error during OAuth2 callback:", error);
      });
  }, []);

  return <div>Loading...</div>;
};

export default OAuth2Callback;

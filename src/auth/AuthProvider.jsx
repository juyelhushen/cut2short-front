import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useLoading from "../hooks/useLoading";
import { getUserInfo } from "../services/UserService";
import { setUserData } from "../store/loginCred/LoginSlice";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { LoadingComponent, withLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    await withLoading(async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await getUserInfo();
          if (userData) {
            dispatch(setUserData(userData));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setAuthChecked(true);
      }
    });
  };

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch(setUserData(userData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    dispatch(setUserData(null));
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authChecked,
        login,
        logout,
        LoadingComponent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);

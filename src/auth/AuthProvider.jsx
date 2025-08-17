import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useLoading from "../hooks/useLoading";
import { clearUserData, setUserData } from "../store/slices/authSlice";
import { getUserInfo } from "/src/services/UserService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      startLoading();
      const userData = await getUserInfo();
      console.log("userData", userData);
      
      if (userData) {
        dispatch(setUserData(userData));
        setIsAuthenticated(true);
      } else {
        dispatch(clearUserData());
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch(clearUserData());
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
      stopLoading();
    }
  };

  const login = (userData) => {
    dispatch(setUserData(userData));
    setIsAuthenticated(true);
  };

  const logout = () => {
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

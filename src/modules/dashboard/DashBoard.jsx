import React from "react";
import { useSelector } from "react-redux";

const DashBoard = () => {
  

  const name = useSelector((state) => state.userData.name);


  return <>{name}</>;
};

export default DashBoard;

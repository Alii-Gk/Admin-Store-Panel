import { getCookie } from "utils/cookie";
import { Outlet } from "react-router-dom";
import React from "react";

const PublicRoutes = () => {
  const token = getCookie("token");
  return token ? <Navigate to="/products" /> : <Outlet />;
};

export default PublicRoutes;

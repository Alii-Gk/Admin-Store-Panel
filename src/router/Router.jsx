import PageNotFound from "pages/PageNotFound";
import PublicRoutes from "./PublicRoutes";
import { useState } from "react";
import LoginPage from "pages/LoginPage";
import ProductsPage from "pages/ProductsPage";
import RegisterPage from "pages/RegisterPage";
import ProtectedRoutes from "router/ProtectedRoutes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage formData={formData} setFormData={setFormData} />}
        />
        <Route element={<PublicRoutes />}>
          <Route
            path="/register"
            element={
              <RegisterPage formData={formData} setFormData={setFormData} />
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

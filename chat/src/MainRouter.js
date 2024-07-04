// MainRouter.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DashBoard from "./Page/DashBoard";
import LoginForm from "./Form/LoginForm";
import { useRequireAuth, AdminRequireAuth } from "./auth";
import RegisterForm from "./Form/RegisterForm";
import AdminPage from "./Page/AdminPage";
import AdminEditPage from "./Page/AdminEditPage";
import AdminLogin from "./Form/AdminLogin";
import Self from "./Page/Self";
import DragTry from "./Page/DragTry";
import Toggle from "./Page/Try/Toggle";
import Scrolll from "./Page/Try/Scrolll";

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = useRequireAuth();

  return isAuthenticated ? (
    React.cloneElement(element, { ...props }) // Pass the props to the element
  ) : (
    <Navigate to="/" replace />
  );
};

const AdminRoute = ({ element, ...props }) => {
  const isAdmin = AdminRequireAuth();

  return isAdmin ? (
    React.cloneElement(element, { ...props }) // Pass the props to the element
  ) : (
    <Navigate to="/" replace />
  );
};

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<LoginForm />} />
        <Route path="/chat/register" element={<RegisterForm />} />
        <Route path="/chat/adminedit" element={<AdminEditPage />} />
        <Route path="/chat/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/self" element={<Self />} /> */}
        <Route path="/chat/dragtry" element={<DragTry />} />
        <Route path="/chat/toggle" element={<Toggle />} />
        <Route path="/chat/scroll" element={<Scrolll />} />




        <Route path="/chat/admin" element={<AdminRoute element={<AdminPage />} />} />

        <Route
          path="/chat/dashboard"
          // element={<DashBoard />}
          element={<PrivateRoute element={<DashBoard />} />}
        />
      </Routes>
    </Router>
  );
};

export default MainRouter;

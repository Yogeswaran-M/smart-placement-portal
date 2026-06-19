import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import YoYoCorp from "./pages/YoYoCorp";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminCompanies from "./pages/AdminCompanies";


const App = () => {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");
    useEffect(() => {
      axios.get("https://smart-placement-portal-po8m.onrender.com/health")
    },[]);

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Student Routes */}

        <Route path="/" element={<Home />} />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/yoyocorp"
          element={<YoYoCorp />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard/>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <AdminProtectedRoute>
              <AdminCompanies/>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/application"
          element={
            <AdminProtectedRoute>
              <AdminApplications/>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
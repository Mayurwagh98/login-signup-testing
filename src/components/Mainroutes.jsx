import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Tasks } from "../pages/Tasks";
// import { PrivateRoute } from "./PrivateRoute";

const Mainroutes = () => {
  let userAuth = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userAuth ? <Tasks /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export { Mainroutes };

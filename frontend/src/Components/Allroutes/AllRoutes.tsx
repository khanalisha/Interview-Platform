// import React from 'react'
import HomePage from "../Pages/HomePage";
import Course from "../Pages/Course";

import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { SignUp } from "../Pages/SignUp";
import { InterviewRoom } from "../Pages/InterviewRoom";
import { UserDashboard } from "../Pages/UserDashboard";
import { PrivateRoute } from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/interviewType" element={<Course />} />

        <Route path="/interviewRoom" element={<InterviewRoom />} />

        <Route
          path="/userdashboard"
          element={
            // <PrivateRoute>
            <UserDashboard />
            // </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;

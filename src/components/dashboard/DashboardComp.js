import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./Dashboard.css";
import NavBar from "../navbar/NavBar";
import AddSkills from "../addskills/AddSkills";
import AddAnEmployee from "../EmployeeDetails/AddAnEmployee";
import ViewEmployees from "../EmployeeDetails/ViewEmployees";

function DashboardComp() {
  const location = useLocation();

  const isEmployeeRoute =
    location.pathname === "/AddAnEmployee" || location.pathname === "/ViewEmployees" || location.pathname === "/Skills";
  return (
    <>
      <NavBar />
      {!isEmployeeRoute && (
        <div className="dashBoardContent">
          <h1 className="text">Welcome to Resource Management</h1>
          <p className="text">
            This tool allows you to add employees and search for existing ones
            based on their skillsets
          </p>
          <img className="imageMarginHome" src="/RMtoolSVGs/RMHome.svg" alt="RM Home" />
        </div>
      )}
      <Routes>
        <Route path="/AddAnEmployee" element={<AddAnEmployee />} />
        <Route path="/ViewEmployees" element={<ViewEmployees />} />
        <Route path="/Skills" element={<AddSkills />} />
      </Routes>
    </>
  );
}

export default DashboardComp;

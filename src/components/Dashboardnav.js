import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ClassIcon from "@mui/icons-material/Class";
import { NavLink, useParams } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useState } from "react";
import "./style/Dashboardnav.css";
import { API } from "../gobal.js";
function Dashboard() {
  const { email } = useParams();
  const [userdetails, setUserDetails] = useState({});

  useEffect(() => {
    fetch(`${API}userdetails/${email}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setUserDetails(data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="title">
            <span className="text"><i class="fa-solid fa-address-card"></i></span>Zen Class
          </div>
        </div>
         
            {/* <NavLink to="leaveapprove" className="link-list m-2">
              <NoteAltIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
              Leave Application
            </NavLink>
           */}
        <div className="row mt-5">
          <NavLink to="dashboard" className="link-list m-2">
            <DashboardIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
            Dashboard
          </NavLink>
          {userdetails.emp_role === "Empolyee" ||
          userdetails.emp_role === "Manager" ? (
            <NavLink to="servicesapply" className="link-list m-2">
              <ClassIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
              Queries
            </NavLink>
          ) : (
            <NavLink to="serviceapprove" className="link-list m-2">
              <ClassIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
              Queries
            </NavLink>
          )}
          {/* {userdetails.emp_role === "Empolyee" ||
          userdetails.emp_role === "Administrator" ? (
            <NavLink to="leave" className="link-list m-2">
              <NoteAltIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
              Leave Application
            </NavLink>
          ) : (
            <NavLink to="leaveapprove" className="link-list m-2">
              <NoteAltIcon sx={{ fontSize: 30 }} className="dashboard-icon" />{" "}
              Leave Application
            </NavLink>
          )} */}
          
          <NavLink to="profile" className="link-list m-2">
            <AccountCircleIcon
              sx={{ fontSize: 30 }}
              className="dashboard-icon"
            />
            Profile
          </NavLink>
          {userdetails.emp_role === "Manager" ||
          userdetails.emp_role === "Administrator" ? (
            <NavLink to="register" className="link-list m-2">
              <PersonAddIcon sx={{ fontSize: 30 }} className="dashboard-icon" />
              Add Profile
            </NavLink>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

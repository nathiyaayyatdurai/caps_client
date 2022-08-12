import React from "react";
import "./style/Dashboardnav.css";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import{API}from"../gobal.js";
function Dashboardtopnav({ email }) {
  const navigate = useNavigate();
  const [userdetails, setUserDetails] = useState({});
  useEffect(() => {
    fetch(`${API}userdetails/${email}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setUserDetails(data));
  }, []);

  const { emp_role, first_name } = userdetails;
  let name;
  if(first_name){
   name =first_name.split("")[0].toUpperCase();
  }
 

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    border: "1px solid black",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
function logout(){
  localStorage.removeItem("token")
  navigate("/")

  
}
  return (
    <>
      <div class="d-flex justify-content-between">
        <div class="p-2 ">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search....."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
        <div className="d-flex p-2 ">
          <div className="d-flex-row p-2 ">
            <div className="text-capitalize top_nav_name"> {first_name} </div>
            <div class="text-lowercase top_nav_role ">{emp_role}</div>
          </div>

          <Avatar sx={{ bgcolor: blueGrey[900] }} aria-label="recipe">
            {first_name? name:'z'}
          </Avatar>
          <div class="text-lowercase top_nav_name  p-2  ">  <LogoutIcon  onClick={logout}/></div>
        </div>
      </div>
    </>
  );
}

export default Dashboardtopnav;

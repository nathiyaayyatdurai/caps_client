import React from 'react'
import Dashboardnav from "./Dashboardnav";
import Dashboardtopnav from "./Dashboardtopnav";
import { Outlet,useParams } from "react-router-dom";
function Dashboardlayout() {
    const {email}= useParams();
  return (
    <div className="container-fluid">
    <div className="row ">
      <div className="col-lg-2 ">
       <Dashboardnav  email={email}/>
      </div>
      <div className="col-lg-10">
      <div className="row ">
      <Dashboardtopnav email={email}/>
      </div>
      <div className="row ">
        <Outlet/>
      </div>
      </div>
      
    </div>
  </div>
  )
}

export default Dashboardlayout
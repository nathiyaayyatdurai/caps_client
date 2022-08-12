import book from "../images/Sign.png";
import { Outlet } from "react-router-dom";
import React from "react";

function Layout() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={book} className="img-fluid" alt="crm.image"></img>
          </div>
          <div className="col-lg-6 mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;

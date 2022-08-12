import React from "react";
import Profileedit from "./Profileedit";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../gobal.js";
function Profile() {
  const { email } = useParams();
  const [userdetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch(`${API}userdetails/${email}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setUserDetails(data));
  }, []);

  return (
    <>
      <h2 className="text-uppercase my-5">
        <NoteAltIcon sx={{ fontSize: 50 }} /> Profile
      </h2>
      {userdetails ? <Profileedit userdetails={userdetails} /> : "Loading..."}
    </>
  );
}

export default Profile;

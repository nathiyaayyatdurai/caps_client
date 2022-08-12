
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import{API}from"../gobal.js";
function Serviceapprove() {
  const [serviceslist, setServiceList] = useState(null);

  useEffect(() => {
    fetch(`${API}servicelist`)
      .then((response) => response.json())
      .then((data) => {
    
        setServiceList(data);
      });
  }, []);

  return (
    <>
    <h2 className="text-uppercase my-5">
    Serviceapprove
    </h2>
    
      {serviceslist ? (
        <Serviceapprovelist serviceslist={serviceslist} />
      ) : (
        "loading..."
      )}
    </>
  );
}

function Serviceapprovelist({ serviceslist }) {

  function accept(id,emp_id) {
  const values={
  "emp_id": emp_id,
   "id":id,
    "status":"accepted"
  }
    fetch(`${API}updateapproveservice`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json","x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.msg){
          toast.success(data.msg);
          window.location.replace("Serviceapprove");
        }else{
          toast.error(data.error);
        }
       
  });
}
  function reject(id,emp_id) {
    const values={
      "emp_id": emp_id,
       "id":id,
        "status":"rejected"
      }
        fetch(`${API}updateapproveleave`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json","x-auth-token": localStorage.getItem("token") },
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.msg){
              toast.success(data.msg);
              window.location.replace("leaveapprove");
            }else{
              toast.error(data.error);
            }
           
      });
  }
  return (
    <>
  {serviceslist.length >0?
   <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>RollNumber</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>from</TableCell>
          <TableCell>To</TableCell>
          <TableCell>reason</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>:""} 
      <TableBody>
        {serviceslist.map((e, index) => (
          <>
            {e.services.map((data, index) => (
              <>
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{e.emp_id}</TableCell>
                  <TableCell>{e.first_name}</TableCell>
                  <TableCell>{data.service_title}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>
                  <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => accept(data.id,e.emp_id)}
                      >
                        Accepted
                      </Button>
                  </TableCell>
                  <TableCell>
                  <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => reject(data.id,e.emp_id)}
                      >
                        Rejected
                      </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        ))}
      </TableBody>
    </>
  );
}



export default Serviceapprove
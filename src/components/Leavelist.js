import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "../gobal.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function Leavelist({ leavedetails }) {
  const { email } = useParams();
  function deleteleave(id) {
    fetch(`${API}removeleave/${email}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          toast.success("Success: " + data.msg);
          window.location.replace("leave");
        }
      });
  }
  return (
    <>
      {leavedetails.leave ? (
        <>
          {" "}
          <h3 className="text-uppercase my-5">Leave Status </h3>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              {leavedetails.leave.length !== 0 ? (
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
                </TableHead>
              ) : (
                " "
              )}
              <TableBody>
                {leavedetails.leave.map((e, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{leavedetails.emp_id}</TableCell>
                    <TableCell>{leavedetails.first_name}</TableCell>
                    <TableCell>{e.fromdate}</TableCell>
                    <TableCell>{e.todate}</TableCell>
                    <TableCell>{e.reason}</TableCell>
                    <TableCell>{e.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => deleteleave(e.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </>
  );
}

export default Leavelist;

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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../gobal.js";
function Serviceslist({ serviceslist }) {
  const { email } = useParams();
  function deleteservice(id) {
    fetch(`${API}removeservice/${email}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          toast.success("Success: " + data.msg);
          window.location.replace("servicesapply");
        }
      });
  }
  return (
    <>
      {serviceslist.services ? (
        <>
          <h3 className="text-uppercase my-5"> Queries Status</h3>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              {serviceslist.services.length !== 0 ? (
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>RollNumber</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
              ) : (
                " "
              )}
              <TableBody>
                {serviceslist.services.map((e, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{serviceslist.emp_id}</TableCell>
                    <TableCell>{serviceslist.first_name}</TableCell>
                    <TableCell>{e.service_title}</TableCell>
                    <TableCell>{e.description}</TableCell>

                    <TableCell>{e.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => deleteservice(e.id)}
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

export default Serviceslist;

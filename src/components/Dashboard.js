import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PendingIcon from "@mui/icons-material/Pending";
import WorkIcon from "@mui/icons-material/Work";
import { Areachart } from "./Userchart";

function Dashboard() {
  
  const data = [
    {
      avatar: "N",
      name: "Nathiya",
      title: "Query",
      status: "on process",
    },
    {
      avatar: "N",
      name: "Nathiya",
      title: "Query",
      status: "completed",
    },
    {
      avatar: "N",
      name: "Nathiya",
      title: "Query",
      status: "on process",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="row mt-1 gap-5 text-center">
              <Paper
                elevation={3}
                sx={{ maxWidth: 250, p: 2, alignItems: "center" }}
              >
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  color="text.secondary"
                >
                  <AssessmentIcon /> Total Project
                </Typography>
                <Typography variant="h5">10</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ maxWidth: 250, p: 2, alignItems: "center" }}
              >
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  color="text.secondary"
                >
                  <CheckBoxIcon /> Completed Project
                </Typography>
                <Typography variant="h5">5</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ maxWidth: 250, p: 2, alignItems: "center" }}
              >
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  color="text.secondary"
                >
                  <PendingIcon /> Pending Project
                </Typography>
                <Typography variant="h5">5</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ maxWidth: 250, p: 2, alignItems: "center" }}
              >
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  color="text.secondary"
                >
                  <WorkIcon /> On Process Project
                </Typography>
                <Typography variant="h5">3</Typography>
              </Paper>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mt-5 ">
            {data.map((e) => (
              <Card sx={{ maxWidth: 450, m: 5 }}>
                <CardHeader
                  className="dash_name gap-1"
                  avatar={
                    <Avatar sx={{ bgcolor: blueGrey[900] }} aria-label="recipe">
                      {e.avatar}
                    </Avatar>
                  }
                  action={<div className="top_nav_role">{e.status}</div>}
                  title={e.name}
                  subheader={e.title}
                />
              </Card>
            ))}
          </div>
          <div className="col-lg-6 mt-5">
            <h4 className="m-0 font-weight-bold text-secondary p-3">
              Software sales
            </h4>

            <Areachart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Leavelist from "./Leavelist";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { blueGrey } from "@mui/material/colors";
import { API } from "../gobal.js";
function Leave() {
  const { email } = useParams();
  const [days, setdays] = useState("");
  const Styles = { display: days === "2" ? " " : "none" };
  const id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  const initialValues = {
    fromdate: "",
    todate: "",
    reason: "",
    status: "pending",
    id: id,
  };
  const validationSchema = yup.object({
    reason: yup.string().required(),
  });
  const onSubmit = (values) => addleave(values);
  const { values, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const [leavedetails, setLeaveDetails] = useState(null);

  useEffect(() => {
    fetch(`${API}userdetails/${email}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          setLeaveDetails(data);
        }
      });
  }, []);

  function addleave(values) {
    console.log(values);
    fetch(`${API}applyleave/${email}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
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
      <div className="row mt-3">
        <div className="col-lg-6">
          <h2 className="text-uppercase my-5">
            <StickyNote2Icon sx={{ fontSize: 50 }} /> Apply Leave
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row mx-5 mt-3">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={days}
                  onClick={(e) => setdays(e.target.value)}
                >
                  <div className="leave-radio-btn">
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="one day"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="More than"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="row  mx-5 mt-3">
              <div className="col-lg-6">
                <span>From:</span>
                <input
                  type="date"
                  className="form-control"
                  placeholder="to Date"
                  onChange={handleChange}
                  name="fromdate"
                  values={values.fromdate}
                />
              </div>
              <div className="col-lg-6">
                <span style={Styles}>To:</span>
                <input
                  style={Styles}
                  type="date"
                  className="form-control"
                  placeholder="from Date"
                  onChange={handleChange}
                  name="todate"
                  values={values.todate}
                />
              </div>
            </div>
            <div className="row  mx-5 mt-3">
              <span>Reason:</span>
              <textarea
                className="form-control"
                rows="3"
                onChange={handleChange}
                name="reason"
                values={values.reason}
              ></textarea>
            </div>
            <div className="mx-5 mt-3 ">
              <Button
                variant="contained"
                className="btn-login"
                sx={{ m: 1, width: 100, bgcolor: blueGrey[900] }}
                type="submit"
              >
                Apply
              </Button>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          {leavedetails ? (
            <Leavelist leavedetails={leavedetails} />
          ) : (
            "loding..."
          )}
        </div>
      </div>
    </>
  );
}

export default Leave;

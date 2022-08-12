import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { blueGrey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useState } from "react";
import { API } from "../gobal.js";
import "./style/Dashboardnav.css";
function Forgetpassword() {
  const [emailstatus, setemailstatus] = useState(null);
  const initialValues = { email: "" };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
  });

  const onSubmit = (values) => forgetpassword(values);

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  function forgetpassword(values) {
    fetch(`${API}forgotpassword`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          toast.success("Success: " + data.msg);
          setemailstatus(data.msg);
          // localStorage.setItem("pass_token", data.pass_token);
          // window.location.replace("forgetpassword");
        }
      });
  }
  return (
    <>
      <h3 className="text-uppercase m-5 tex">Forgotten password </h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-error-helper-text"
          label="Email"
          name="email"
          values={values.email}
          sx={{ m: 1, width: 370 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : " "}
        />
        <Button
          variant="contained"
          className="btn-login"
          sx={{ m: 2, width: 100, height: 40, bgcolor: blueGrey[900] }}
          type="submit"
        >
          Send
        </Button>
      </form>
      {emailstatus ? (
        <div className="p-3 mb-2">
          <h5 className="m-5 text-muted ">
            Reset password link was send to your email. please check your mail !
          </h5>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Forgetpassword;

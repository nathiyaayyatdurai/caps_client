import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import { blueGrey } from "@mui/material/colors";
import KeyIcon from "@mui/icons-material/Key";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import{API}from"../gobal.js";
import "./style/Dashboardnav.css";
function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(6, "Password is too short - should be 6 chars minimum."),
  });
  const onSubmit = (values) => login(values);

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  function login(values) {
    fetch(`${API}login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          localStorage.setItem("token", data.token);
          navigate(`/dashboardlayout/${data.email}`);
        }
      }).catch((error) => {console.log(error)})
  }

  return (
    <>
    <div className="m-5">
      <h2 className="page-title mt-5"> LOGIN</h2>
      <p className="page-subtitle mt-3">Welcome to Login Page</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-error-helper-text"
            label="password"
            type="password"
            name="password"
            values={values.password}
            autoComplete="current-password"
            sx={{ m: 1, width: 370 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={
              errors.password && touched.password ? errors.password : " "
            }
          />
        </div>

        <Button
          variant="contained"
          className="btn-login"
          sx={{ m: 1, width: 100, bgcolor: blueGrey[900] }}
          type="submit"
        >
          Login
        </Button>
        <div className="d-flex gap-5 m-2">
        <NavLink to="/forgetpassword" className="forgetpassword">
          forgetpasswords?
        </NavLink>
        <NavLink to="/hint" className="forgetpassword">
          hint
        </NavLink>
        
        </div>
       
      </form>
      </div>
    </>
  );
}

export default Login;

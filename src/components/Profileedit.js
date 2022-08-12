import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import BadgeIcon from "@mui/icons-material/Badge";
import { blueGrey } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../gobal.js";
function Profileedit({ userdetails }) {
  const { email } = useParams();
  const initialValues = {
    first_name: userdetails.first_name,
    last_name: userdetails.last_name,
    emp_id: userdetails.emp_id,
    email: userdetails.email,
  };
  const validationSchema = yup.object({
    first_name: yup.string().required().min(5).max(13),
    last_name: yup.string().required().min(5).max(13),
    email: yup.string().email().required(),
  });
 

  const onSubmit = (values) => Editempolyee(values);

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  function Editempolyee(values) {
    fetch(`${API}updatedetails/${email}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          toast.success(data.msg);
          window.location.replace("profile");
        } else {
          toast.error(data.error);
        }
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            id="outlined-error-helper-text"
            label="Frist Name"
            name="first_name"
            defaultValue={values.first_name}
            values={values.first_name}
            sx={{ m: 1, width: 370 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.first_name && touched.first_name}
            helperText={
              errors.first_name && touched.first_name ? errors.first_name : " "
            }
          />
        </div>{" "}
        <div className="mb-3">
          <TextField
            id="outlined-error-helper-text"
            label="Last Name"
            name="last_name"
            values={values.last_name}
            defaultValue={values.last_name}
            sx={{ m: 1, width: 370 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.last_name && touched.last_name}
            helperText={
              errors.last_name && touched.last_name ? errors.last_name : " "
            }
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-error-helper-text"
            label="Empolyee Id"
            name="emp_id"
            disabled
            values={values.emp_id}
            defaultValue={values.emp_id}
            sx={{ m: 1, width: 370 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.emp_id && touched.emp_id}
            helperText={errors.emp_id && touched.emp_id ? errors.emp_id : " "}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-error-helper-text"
            label="Email"
            name="email"
            values={values.email}
            defaultValue={values.email}
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
        <Button
          variant="contained"
          className="btn-login"
          sx={{ m: 1, width: 100, bgcolor: blueGrey[900] }}
          type="submit"
        >
          EDIT
        </Button>
      </form>
    </>
  );
}

export default Profileedit;

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import BadgeIcon from "@mui/icons-material/Badge";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteIcon from "@mui/icons-material/Note";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { toast } from "react-toastify";
import { API } from "../gobal.js";
import { blueGrey } from "@mui/material/colors";
function Register() {

  const names = ["Empolyee", "Administrator", "Manager"];
  const initialValues = {
    first_name: "",
    last_name: "",
    emp_id: "",
    emp_role: "",
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    first_name: yup.string().required().min(5).max(13),
    last_name: yup.string().required().min(5).max(13),
    emp_id: yup.string().required().min(6).max(6),

    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(8, "Password is too short - should be 8 chars minimum."),
  });
  const onSubmit = (values) => addempolyee(values);

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  function addempolyee(values) {
    fetch(`${API}register`, {
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
          window.location.replace("register");
        }
      });
  }
  return (
    <>
      <h2 className="text-uppercase my-5">
        <PersonPinIcon sx={{ fontSize: 50 }} />
        Add Employee
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <TextField
            id="outlined-error-helper-text"
            label="Frist Name"
            name="first_name"
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
          <TextField
            id="outlined-error-helper-text"
            label="Last Name"
            name="last_name"
            values={values.last_name}
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

        <div className="row">
          <TextField
            id="outlined-error-helper-text"
            label="Empolyee Id"
            name="emp_id"
            values={values.emp_id}
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
          <FormControl sx={{ m: 1, width: 370 }}>
            <InputLabel id="demo-simple-select-label">Empolyee Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="emp_role"
              value={values.emp_role}
              label="Empolyee Role"
              onChange={handleChange}
              sx={{ width: 370 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NoteIcon />
                  </InputAdornment>
                ),
              }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="row">
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
          Save
        </Button>
      </form>
    </>
  );
}

export default Register;

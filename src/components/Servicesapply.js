import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import NoteIcon from "@mui/icons-material/Note";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Serviceslist from './Serviceslist'
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { blueGrey } from "@mui/material/colors";
import { toast } from "react-toastify";
import{API}from"../gobal.js";
function Servicesapply() {
  const names = ["Task", "Hackathon","class Topic"];
  
  const { email } = useParams();
  const [serviceslist, setServiceList] = useState(null);

  useEffect(() => {
    fetch(`${API}userdetails/${email}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => setServiceList(data));
  }, []);
  const id=Math.floor(Math.random()*(999-100+1)+100);
  const initialValues = {
    service_title: "",
    description: "",
    status: "pending",
    id:id ,
  };
  const validationSchema = yup.object({
    description: yup.string().required(),
  });
  const onSubmit = (values) => applyservices(values);
  const { values, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
    function applyservices(values) {
        fetch(`${API}applyservices/${email}`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" ,"x-auth-token": localStorage.getItem("token")},
        })
          .then((response) => response.json())
          .then((data) =>{
            if(data.error) {
              toast.error("Error: " + data.error);
            }else{
              toast.success("Success: " + data.msg);
              window.location.replace("servicesapply")
           
            }
          } 
        );
      }
  return (
    <>
     
    <div className="row mt-3">
   
      <div className="col-lg-6">
      <h2 className="text-uppercase my-5">
      <SettingsSuggestIcon sx={{ fontSize: 50 }}/> Create Queries
    </h2>
      <form onSubmit={handleSubmit}>
    <div className="row mx-5 mt-3">
    <span>Select Topic</span>
    <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
             
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="service_title"
              value={values.service_title}
              label="services"
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
      <div className="row  mx-5 mt-3">
          <span>Description</span>
          <textarea
            className="form-control"
            rows="3"
            onChange={handleChange}
            name="description"
            values={values.description}
          ></textarea>
        </div>
      <div className="mx-5 mt-3 ">
        
      <Button
          variant="contained" 
          className="btn-login"
          
          sx={{ m: 1, width: 100,bgcolor: blueGrey[900] }}
          type="submit"
        >
         Apply
        </Button>
      </div>
      </form>
      </div>
      <div className="col-lg-6">
      
    {serviceslist ?   <Serviceslist serviceslist={serviceslist} /> : (
          "loding..."
        )}
      </div>
    </div>
   
   
  </>
  
  );
}

export default Servicesapply;

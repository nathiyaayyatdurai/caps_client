import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboardlayout from "./components/Dashboardlayout";
import Profile from "./components/Profile";
import Leave from "./components/Leave";
import Leaveapprove from "./components/Leaveapprove";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
import Servicesapply from "./components/Servicesapply";
import Serviceapprove from "./components/Serviceapprove";
import Dashboard from "./components/Dashboard";
import Hint from "./components/Hint";
import { Requriedathu } from "./components/Requriedathu";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Login />} />
          <Route path="login" element={<Login/> }/>
          </Route>
        
          <Route path="/resetpassword/:pass_token" element={<Resetpassword />}/ >
          <Route path="/forgetpassword" element={<Forgetpassword />}/ >
          <Route path="/hint" element={<Hint />}/ >
          <Route path="/dashboardlayout/:email" element={<Requriedathu><Dashboardlayout /></Requriedathu>} >
          <Route index element={<Dashboard />}/ >
          <Route path="dashboard" element={<Dashboard />}/ >
          <Route path="register" element={<Register />}/ >
          <Route path="Serviceapprove" element={<Serviceapprove />}/ >
          <Route path="Servicesapply" element={<Servicesapply />}/ >
          <Route path="leaveapprove" element={<Leaveapprove />}/ >
          <Route path="leave" element={<Leave />}/ >
          <Route path="profile" element={<Profile />}/ >
            
        </Route>
     
      </Routes>
      <ToastContainer autoclose={5000} />
    </div>
  );
}

export default App;

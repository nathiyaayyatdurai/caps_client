import { Navigate } from "react-router-dom";

export function Requriedathu({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate replace to="/" />;
}

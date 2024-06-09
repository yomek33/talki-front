import React, { FC, ComponentType, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../api/AuthProvider";
import LogOut from "./LogOut";

interface PrivateRouteProps {
  component: ComponentType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
  const authContext = useContext(AuthContext);

  return authContext?.user ? (
    <>
      <h1>Private Route</h1>
      <LogOut />
      <Component />
    </>
  ) : (
    <Navigate replace to="/about" />
  );
};

export default PrivateRoute;

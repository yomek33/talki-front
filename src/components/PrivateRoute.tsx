import React, { FC, ComponentType, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../api/AuthProvider";
import LogOut from "./LogOut";
import { useAtom } from "jotai";
import { userAtom } from "../globalState/user";

interface PrivateRouteProps {
  component: ComponentType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [user] = useAtom(userAtom);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  console.log("PrivateRoute authContext:", authContext);
  console.log("PrivateRoute user:", user);
  return user ? (
    <>
      <h1>Private Route</h1>
      <LogOut />
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/about" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

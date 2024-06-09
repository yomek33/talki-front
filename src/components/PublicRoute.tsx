import React, { FC, ComponentType } from "react";
import { Navigate, PathRouteProps } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../api/AuthProvider";

interface PublicRouteProps extends PathRouteProps {
  component: ComponentType;
  authenticatedRoute?: string;
}

const PublicRoute: FC<PublicRouteProps> = ({
  component: Component,
  authenticatedRoute = "/",
}) => {
  const authContext = useContext(AuthContext);

  return authContext?.user ? (
    <Navigate replace to={authenticatedRoute} />
  ) : (
    <>
      <h1>Public Route</h1>
      <Component />
    </>
  );
};

export default PublicRoute;

import React, { FC, ComponentType } from "react";
import { Navigate, PathRouteProps } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom, verifyUserByBackendAtom } from "../globalState/user";

interface PublicRouteProps extends PathRouteProps {
  component: ComponentType;
  path?: string;
}

const PublicRoute: FC<PublicRouteProps> = ({
  component: Component,
  path = "/",
}) => {
  const [user] = useAtom(userAtom);
  const [isVerifyUserByBackend] = useAtom(verifyUserByBackendAtom);

  return user && isVerifyUserByBackend ? (
    <Navigate replace to={path} />
  ) : (
    <>
      <h1>Public Route</h1>
      <Component />
    </>
  );
};

export default PublicRoute;

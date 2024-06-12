import React, { FC, useContext, ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../services/AuthProvider";
import LogOut from "./Auth/LogOut";
import { useAtom } from "jotai";
import {
  userAtom,
  verifyUserByBackendAtom,
  loadingAtom,
} from "../globalState/user";

interface PrivateRouteProps {
  component: ComponentType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [user] = useAtom(userAtom);
  const [isVerifyUserByBackend] = useAtom(verifyUserByBackendAtom);

  const [loading] = useAtom(loadingAtom);

  if (!authContext || loading) {
    return <div>Loading...</div>;
  }

  if (user && isVerifyUserByBackend) {
    return (
      <>
        <h1>Private Route</h1>
        <LogOut />
        <Component />
      </>
    );
  } else {
    return <Navigate to="/about" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;

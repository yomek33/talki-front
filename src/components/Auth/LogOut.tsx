import React, { FC, useContext } from "react";
import { AuthContext } from "../../services/AuthProvider";
import { useAtom } from "jotai";
import { userAtom, loadingAtom } from "../../globalState/user";
import { useNavigate } from "react-router-dom";

const LogOut: FC = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { logOut } = authContext;

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await logOut();
      setUser(null);
      navigate("/about");
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-xl mb-4">Welcome, {user?.displayName}!</p>
      <button onClick={handleLogOut} disabled={loading}>
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
};

export default LogOut;

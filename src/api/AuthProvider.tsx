import React, { createContext, useContext, useEffect, ReactNode } from "react";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import PropTypes from "prop-types";
import FirebaseConfig from "./FirebaseConfig";
import { useAtom } from "jotai";
import { userAtom, loadingAtom } from "../globalState/user";

const { auth, signInWithGoogle } = FirebaseConfig;

interface AuthContextProps {
  user: FirebaseUser | null;
  logOut: () => Promise<void>;
  loading: boolean;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      console.log("User successfully signed out");
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Error during auth state change:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUser, setLoading]);

  const authValue: AuthContextProps = {
    user,
    logOut,
    loading,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

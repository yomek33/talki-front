import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "./FirebaseConfig";

interface AuthValue {
  createUser: (email: string, password: string) => Promise<void>;
  user: firebase.User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue: AuthValue = {
    createUser,
    user,
    loginUser,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

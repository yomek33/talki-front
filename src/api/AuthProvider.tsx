import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signOut,
  getIdToken,
  User as FirebaseUser,
} from "firebase/auth";
import PropTypes from "prop-types";
import FirebaseConfig from "./FirebaseConfig";
import { useAtom } from "jotai";
import {
  userAtom,
  loadingAtom,
  verifyUserByBackendAtom,
} from "../globalState/user";

const { auth, signInWithGoogle } = FirebaseConfig;

interface AuthContextProps {
  user: FirebaseUser | null;
  idToken: string | null;
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
  const [verifyUserByBackend, setVerifyUserByBackend] = useAtom(
    verifyUserByBackendAtom
  );
  const [idToken, setIdToken] = useState<string | null>(null);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setIdToken(null);
      setVerifyUserByBackend(false);
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
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const token = await getIdToken(currentUser);
          setIdToken(token);
        }
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
    idToken,
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

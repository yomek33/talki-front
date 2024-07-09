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
import FirebaseConfig from "./api/FirebaseConfig";
import { useAtom } from "jotai";
import {
  firebaseUserAtom,
  userAtom,
  loadingAtom,
  verifyUserByBackendAtom,
} from "../../src/globalState/user";
import { sendUserDataToBackend } from "./api/auth";
import { User } from "../types";

const { auth, signInWithGoogle } = FirebaseConfig;

interface AuthContextProps {
  firebaseUser: FirebaseUser | null;
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
  const [firebaseUser, setFirebaseUser] = useAtom(firebaseUserAtom);
  const [, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, setVerifyUserByBackend] = useAtom(verifyUserByBackendAtom);
  const [idToken, setIdToken] = useState<string | null>(null);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setFirebaseUser(null);
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
        setFirebaseUser(currentUser);
        if (currentUser) {
          const token = await getIdToken(currentUser);
          setIdToken(token);
          // Verify user by backend here and update userAtom
          try {
            const backendUser: User = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              idToken: token,
              photoURL: currentUser.photoURL || "",
            };
            await sendUserDataToBackend(backendUser);
            setUser(backendUser);
            setVerifyUserByBackend(true);
          } catch (error) {
            console.error("User verification with backend failed:", error);
            setVerifyUserByBackend(false);
          }
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
  }, [setFirebaseUser, setUser, setLoading, setVerifyUserByBackend]);

  const authValue: AuthContextProps = {
    firebaseUser,
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

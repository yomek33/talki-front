import React, { useContext, useState } from "react";
import { useAtom } from "jotai";
import { AuthContext } from "../api/AuthProvider";
import { sendUserDataToBackend } from "../api/backend";
import { User } from "../types";
import GoogleSignInButton from "./GoogleSigninButton";
import { userAtom, loadingAtom } from "../globalState/user";

const SignIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [isBackendConfirmed, setIsBackendConfirmed] = useState(false);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { signInWithGoogle, logOut } = authContext;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithGoogle();
      console.log("User Credential:", userCredential);
      if (userCredential) {
        const idToken = await userCredential.getIdTokenResult(true);
        const userData: User = {
          idToken: idToken.token,
          uid: userCredential.uid,
          displayName: userCredential.displayName,
          email: userCredential.email,
          photoURL: userCredential.photoURL,
        };
        const response = await sendUserDataToBackend(userData);
        if (response) {
          setIsBackendConfirmed(true);
          setUser(userCredential);
        } else {
          throw new Error("Backend verification failed");
        }
      }
    } catch (error) {
      setUser(null);
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await logOut();
      setUser(null);
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : user && isBackendConfirmed ? (
        <div className="text-center">
          <p className="text-xl mb-4">Welcome, {user.displayName}!</p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <GoogleSignInButton
          isSigningIn={loading}
          onGoogleSignIn={handleSignIn}
        />
      )}
    </div>
  );
};

export default SignIn;

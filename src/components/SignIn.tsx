import React, { useState, useContext } from "react";
import { AuthContext } from "../api/AuthProvider";
import { sendUserDataToBackend } from "../api/backend";
import { User } from "../types";
import GoogleSignInButton from "./GoogleSigninButton";
const SignIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [isBackendConfirmed, setIsBackendConfirmed] = useState(false);
  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { signInWithGoogle, loading, user, logOut } = authContext;

  const handleSignIn = async () => {
    try {
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
        if (response.jwt_token) {
          setIsBackendConfirmed(true);
        } else {
          throw new Error("Backend verification failed");
        }
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
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

import React from "react";
import { signInWithGoogle } from "../api/firebaseConfig";

interface SignInProps {
  onSignIn: (token: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const handleGoogleLogin = async () => {
    const token = await signInWithGoogle();
    if (token) {
      onSignIn(token);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default SignIn;

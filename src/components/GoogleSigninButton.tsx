import React from "react";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
  isSigningIn: boolean;
  onGoogleSignIn: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  isSigningIn,
  onGoogleSignIn,
}) => {
  return (
    <Button
      disabled={isSigningIn}
      onPress={onGoogleSignIn}
      className={`w-full max-w-xs flex items-center justify-center gap-x-3 py-2.5 text-sm font-medium bg-white shadow-md ${
        isSigningIn
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100 active:bg-gray-200"
      }`}
      style={{
        borderRadius: "0.375rem", // var(--nextui-radii-lg) equivalent
      }}
    >
      <FcGoogle /> {isSigningIn ? "Signing In..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;

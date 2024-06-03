import React from "react";
import SignIn from "./components/SignIn";
const App: React.FC = () => {
  const handleSignIn = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verifyToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Token is valid");
      } else {
        console.error("Invalid token");
      }
    } catch (error) {
      console.error("Error verifying token", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <SignIn onSignIn={handleSignIn} />
      </header>
    </div>
  );
};

export default App;

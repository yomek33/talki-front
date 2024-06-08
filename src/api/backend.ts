import { User } from "../types";

const backendUri = import.meta.env.VITE_BACKEND_URI;

export const sendUserDataToBackend = async (user: User) => {
  try {
    const response = await fetch(`${backendUri}/api/auth`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_token: user.idToken,
        uid: user.uid,
        display_name: user.displayName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send user data to backend");
    }

    return true;
  } catch (error) {
    console.error("Error sending user data to backend:", error);
    throw error;
  }
};

import { User } from "../types";

const backendUri = import.meta.env.VITE_BACKEND_URI;

export const sendUserDataToBackend = async (user: User) => {
  try {
    const response = await fetch(`${backendUri}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to send user data to backend");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending user data to backend:", error);
    throw error;
  }
};

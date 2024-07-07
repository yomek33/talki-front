import { Chat, Message } from "../../types";

const API_BASE_URL = "http://localhost:8080";

export const createChat = async (
  detail: string,
  materialId: number,
  userUid: string
): Promise<Chat> => {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      detail,
      material_id: materialId,
      user_uid: userUid,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchChatsByMaterialId = async (
  materialId: number
): Promise<Chat[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${materialId}/chats`);
    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    throw error;
  }
};

export const fetchChatById = async (chatId: number): Promise<Chat> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chat with id ${chatId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch chat with id ${chatId}:`, error);
    throw error;
  }
};

export const fetchMessagesByChatId = async (
  chatId: number
): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch messages for chat with id ${chatId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch messages for chat with id ${chatId}:`,
      error
    );
    throw error;
  }
};

export const sendMessage = async (
  chatId: number,
  message: Omit<Message, "ID" | "createdAt">
): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message to chat with id ${chatId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to send message to chat with id ${chatId}:`, error);
    throw error;
  }
};

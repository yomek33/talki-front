import { Chat, Message } from "../../types";
const API_BASE_URL = "http://localhost:8080";

export const useChatApi = () => {
  const createChat = async (
    materialId: number,
    userUid: string
  ): Promise<Chat> => {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        material_id: materialId,
        user_uid: userUid,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const fetchChatsByMaterialId = async (
    materialId: number
  ): Promise<Chat[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/materials/${materialId}/chats`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      throw error;
    }
  };

  const fetchChatById = async (chatId: number): Promise<Chat> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat with id ${chatId}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch chat with id ${chatId}:`, error);
      throw error;
    }
  };

  const fetchMessagesByChatId = async (chatId: number): Promise<Message[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat/${chatId}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

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

  const sendMessage = async (
    chatId: number,
    message: Omit<Message, "ID" | "createdAt">
  ): Promise<Message> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  return {
    createChat,
    fetchChatsByMaterialId,
    fetchChatById,
    fetchMessagesByChatId,
    sendMessage,
  };
};

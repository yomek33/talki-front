import { atom } from "jotai";
import { Chat, Message } from "../types";
import { useChatApi } from "../services/api/chatApi";

export const chatsAtom = atom<Chat[]>([]);

// Fetch chats by material ID and update the atom
export const fetchChatsByMaterialIdAtom = atom(
  null,
  async (get, set, materialId: number) => {
    const { fetchChatsByMaterialId } = useChatApi();
    try {
      const chatsFromApi = await fetchChatsByMaterialId(materialId);
      set(chatsAtom, chatsFromApi);
    } catch (error) {
      console.error(
        `Failed to fetch chats for material with id ${materialId}:`,
        error
      );
    }
  }
);

// Add a message to a chat and update the atom
export const addMessageToChatAtom = atom(
  null,
  async (
    get,
    set,
    {
      chatID,
      message,
    }: {
      chatID: number;
      message: Omit<Message, "ID" | "createdAt">;
    }
  ) => {
    const { sendMessage } = useChatApi();
    try {
      const newMessage = await sendMessage(chatID, message);
      const chats = get(chatsAtom);
      const chatIndex = chats.findIndex((chat) => chat.ID === chatID);
      if (chatIndex !== -1) {
        const updatedChat = {
          ...chats[chatIndex],
          Messages: [...chats[chatIndex].Messages, newMessage],
        };
        const updatedChats = [...chats];
        updatedChats[chatIndex] = updatedChat;
        set(chatsAtom, updatedChats);
      }
    } catch (error) {
      console.error("Failed to add message:", error);
    }
  }
);

// Create chat and fetch details
export const createAndFetchChatAtom = atom(
  null,
  async (
    get,
    set,
    {
      materialId,
      userUid,
      createChat,
      fetchChatById,
    }: {
      materialId: number;
      userUid: string;
      createChat: (
        materialId: number,
        userUid: string
      ) => Promise<{ ID: number }>;
      fetchChatById: (chatId: number) => Promise<Chat>;
    }
  ) => {
    try {
      const newChat = await createChat(materialId, userUid);
      const fetchedChat = await fetchChatById(newChat.ID);
      set(chatsAtom, (prevChats) => [...prevChats, fetchedChat]);
      return fetchedChat;
    } catch (error) {
      console.error("Failed to create and fetch chat:", error);
      throw error;
    }
  }
);

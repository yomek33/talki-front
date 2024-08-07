import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Chat, Message } from "../types";
import { useChatApi } from "../services/api/chatApi";

export const chatsAtom = atom<Chat[]>([]);
export const messagesAtomFamily = atomFamily((chatId: number) =>
  atom<Message[]>([])
);

// Fetch chats by material ID and update the atom
export const fetchChatsByMaterialIdAtom = atom(
  null,
  async (get, set, { materialId, fetchMessagesByChatId }) => {
    const { fetchChatsByMaterialId } = useChatApi();
    try {
      const chatsFromApi = await fetchChatsByMaterialId(materialId);
      if (chatsFromApi.length === 0) {
        console.warn(`No chats found for material with id ${materialId}.`);
        set(chatsAtom, []);
        return null;
      } else {
        set(chatsAtom, chatsFromApi);
        const chatID = chatsFromApi[0].ID;
        const firstChatMessages = await fetchMessagesByChatId(chatID);
        set(messagesAtomFamily(chatID), firstChatMessages);
        return chatsFromApi[0];
      }
    } catch (error) {
      console.error(
        `Failed to fetch chats for material with id ${materialId}:`,
        error
      );
      throw error;
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
      temporaryID,
    }: {
      chatID: number;
      message: Omit<Message, "ID" | "createdAt">;
      temporaryID: number;
    }
  ) => {
    const { sendMessage } = useChatApi();
    try {
      const newMessage = await sendMessage(chatID, message);
      newMessage.sender_type = "user";
      const chats = get(chatsAtom);
      const chatIndex = chats.findIndex((chat) => chat.ID === chatID);
      if (chatIndex !== -1) {
        const updatedChat = {
          ...chats[chatIndex],
          Messages: chats[chatIndex].Messages.map((msg) =>
            msg.ID === temporaryID ? newMessage : msg
          ),
        };
        const updatedChats = [...chats];
        updatedChats[chatIndex] = updatedChat;
        set(chatsAtom, updatedChats);

        // Also update messagesAtomFamily for the specific chat
        set(messagesAtomFamily(chatID), updatedChat.Messages);
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

export const fetchMessagesByChatIdAtom = atom(
  null,
  async (get, set, chatID: number) => {
    const { fetchMessagesByChatId } = useChatApi();
    try {
      const messages = await fetchMessagesByChatId(chatID);
      set(messagesAtomFamily(chatID), messages);
      return messages;
    } catch (error) {
      console.error(`Failed to fetch messages for chat ID ${chatID}:`, error);
      throw error;
    }
  }
);

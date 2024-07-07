// globalState/chat.ts
import { atom } from "jotai";
import { Chat, Message } from "../types";
import { fetchChatsByMaterialId, sendMessage } from "../services/api/chatApi";

export const chatsAtom = atom<Chat[]>([]);

// チャットのデータをバックエンドからフェッチ
export const fetchChatsByMaterialIdAtom = atom(
  null,
  async (get, set, materialId: number) => {
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

// 新しいメッセージをバックエンドに送信し、チャットに追加する
export const addMessageToChatAtom = atom(
  null,
  async (
    get,
    set,
    {
      chatID,
      message,
    }: { chatID: number; message: Omit<Message, "ID" | "createdAt"> }
  ) => {
    try {
      const newMessage = await sendMessage(chatID, message);
      const chats = get(chatsAtom);
      const chatIndex = chats.findIndex((chat) => chat.ID === chatID);
      if (chatIndex !== -1) {
        const updatedChat = {
          ...chats[chatIndex],
          messages: [...chats[chatIndex].messages, newMessage],
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

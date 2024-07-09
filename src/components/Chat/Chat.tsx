import React, { useEffect, useState, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import { useAtom } from "jotai";
import { userAtom } from "../../globalState/user";
import {
  fetchChatsByMaterialIdAtom,
  createAndFetchChatAtom,
} from "../../globalState/chat";
import { useChatApi } from "../../services/api/chatApi";
import { Chat as ChatType } from "../../types";

interface ChatProps {
  materialId: number;
  chats: ChatType[];
}
const Chat: React.FC<ChatProps> = ({ materialId, chats: initialChats }) => {
  const { createChat, fetchChatById } = useChatApi();
  const [User] = useAtom(userAtom);
  const fetchChatsByMaterialId = useAtom(fetchChatsByMaterialIdAtom)[1];
  const createAndFetchChat = useAtom(createAndFetchChatAtom)[1];

  const [defaultChatID, setDefaultChatID] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [chats, setChats] = useState<ChatType[]>(initialChats);

  const handleCreateChat = useCallback(async () => {
    if (!User) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const newChat = await createAndFetchChat({
        materialId,
        userUid: User.uid,
        createChat,
        fetchChatById,
      });
      if (newChat && newChat.ID) {
        setDefaultChatID(newChat.ID);
        setChats((prevChats) => [
          ...(Array.isArray(prevChats) ? prevChats : []),
          newChat,
        ]);
      } else {
        console.error("Created chat does not have an ID");
      }
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  }, [User, materialId, createAndFetchChat, createChat, fetchChatById]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!initialChats || initialChats.length === 0) {
        await handleCreateChat();
      } else {
        setDefaultChatID(initialChats[0].ID);
        setChats(initialChats);
      }
      setInitialized(true);
    };

    if (!initialized) {
      fetchChats();
    }
  }, [
    fetchChatsByMaterialId,
    materialId,
    initialized,
    initialChats,
    chats,
    handleCreateChat,
  ]);

  if (!User) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 bg-gray-800 text-white"></div>

      <div className="flex flex-col flex-grow h-full overflow-auto p-6 space-y-5">
        {defaultChatID && (
          <>
            {chats[0] && (
              <>
                <ChatMessage chat={chats[0]} />
                <ChatForm chatID={chats[0].ID} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;

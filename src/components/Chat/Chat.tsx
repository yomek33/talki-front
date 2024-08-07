import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import { useAtom } from "jotai";
import { userAtom } from "../../globalState/user";
import {
  fetchChatsByMaterialIdAtom,
  messagesAtomFamily,
  addMessageToChatAtom,
  fetchMessagesByChatIdAtom,
} from "../../globalState/chat";
import { useChatApi } from "../../services/api/chatApi";
import { Chat as ChatType, Message as MessageType } from "../../types";

interface ChatProps {
  materialId: number;
  chats: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ materialId, chats: initialChats }) => {
  const { createChat, fetchChatById, fetchMessagesByChatId } = useChatApi();
  const [User] = useAtom(userAtom);
  const fetchChatsByMaterialId = useAtom(fetchChatsByMaterialIdAtom)[1];
  const [, setChats] = useState<ChatType[]>(initialChats);
  const [defaultChatID, setDefaultChatID] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, addMessageToChat] = useAtom(addMessageToChatAtom);
  const fetchMessages = useAtom(fetchMessagesByChatIdAtom)[1];

  const [messages, setMessages] = useAtom(
    defaultChatID !== null
      ? messagesAtomFamily(defaultChatID)
      : messagesAtomFamily(-1)
  );

  useEffect(() => {
    const fetchChats = async () => {
      if (!User) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const chat = await fetchChatsByMaterialId({
          materialId,
          fetchMessagesByChatId,
        });
        if (chat) {
          setChats((prevChats) => [
            ...(Array.isArray(prevChats) ? prevChats : []),
            chat,
          ]);
          setDefaultChatID(chat.ID);
          const chatMessages = await fetchMessages(chat.ID);
          setMessages(chatMessages); // Update local state with messages
        }
      } catch (error) {
        console.error("Failed to fetch or create chat", error);
        setError("Failed to fetch or create chat");
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
    User,
    createChat,
    fetchChatById,
    fetchMessagesByChatId,
    setMessages,
  ]);

  const handleSendMessage = async (content: string) => {
    if (!defaultChatID) return;

    const temporaryID = Date.now();
    const newMessage: MessageType = {
      ID: temporaryID,
      content,
      materialID: 0,
      chatID: defaultChatID,
      sender_type: "user",
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await addMessageToChat({
        chatID: defaultChatID,
        message: {
          content,
          materialID: 0,
          chatID: defaultChatID,
          sender_type: "User",
        },
        temporaryID,
      });

      const updatedMessages = await fetchMessages(defaultChatID);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Failed to send message", error);
      setError("Failed to send message. Please try again.");
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.ID !== temporaryID)
      );
    }
  };

  if (!User) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 bg-gray-800 text-white"></div>
      <div className="flex flex-col flex-grow h-full overflow-auto p-6 space-y-5">
        {defaultChatID && (
          <>
            <ChatMessage chatID={defaultChatID} messages={messages} />
            <ChatForm
              chatID={defaultChatID}
              onSendMessage={handleSendMessage}
            />
          </>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;

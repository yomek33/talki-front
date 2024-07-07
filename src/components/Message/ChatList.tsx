import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { chatsAtom, fetchChatsByMaterialIdAtom } from "../../globalState/chat";
import { createChat } from "../../services/api/chatApi";
import { User } from "../../types";

interface ChatListProps {
  user: User;
  materialId: number;
  onSelectChat: (chatID: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  user,
  materialId,
  onSelectChat,
}) => {
  const [chats, setChats] = useAtom(chatsAtom);
  const [, fetchChats] = useAtom(fetchChatsByMaterialIdAtom);

  useEffect(() => {
    fetchChats(materialId);
  }, [fetchChats, materialId]);

  const handleCreateChat = async () => {
    try {
      const newChat = await createChat("New Chat", materialId, user.uid);
      setChats([...chats, newChat]);
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  return (
    <div className="chat-list">
      {chats
        .filter((chat) => chat.materialID === materialId)
        .map((chat) => (
          <div
            key={chat.ID}
            onClick={() => onSelectChat(chat.ID)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {chat.detail}
          </div>
        ))}
      <button
        onClick={handleCreateChat}
        className="create-chat-button p-2 bg-blue-500 text-white rounded mt-3"
      >
        新しいチャットを作成
      </button>
    </div>
  );
};

export default ChatList;

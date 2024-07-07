import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import { useAtom } from "jotai";
import { userAtom } from "../../globalState/user";
import { fetchChatsByMaterialIdAtom } from "../../globalState/chat";

interface ChatProps {
  materialId: number;
}

const Chat: React.FC<ChatProps> = ({ materialId }) => {
  const [User] = useAtom(userAtom);
  const [, fetchChatsByMaterialId] = useAtom(fetchChatsByMaterialIdAtom);
  const [activeChatID, setActiveChatID] = useState<number | null>(null);

  useEffect(() => {
    fetchChatsByMaterialId(materialId);
  }, [fetchChatsByMaterialId, materialId]);

  if (!User) {
    return <div>Not logged in</div>;
  }

  const handleSelectChat = (chatID: number) => {
    setActiveChatID(chatID);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* チャットヘッダー */}
      <div className="p-3 bg-gray-800 text-white">
        <h1 className="text-lg">チャットルーム</h1>
      </div>

      <div className="flex flex-row h-full">
        {/* チャットリスト */}
        <div className="w-1/4 bg-gray-100 p-3 border-r border-gray-300">
          <ChatList
            user={User}
            materialId={materialId}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* チャットメインエリア */}
        <div className="flex flex-col flex-grow h-full overflow-auto p-6 space-y-5">
          {activeChatID ? (
            <>
              <ChatMessage chatID={activeChatID} />
              <ChatForm user={User} chatID={activeChatID} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>チャットを選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

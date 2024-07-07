import React from "react";
import { useAtom } from "jotai";
import { chatsAtom } from "../../globalState/chat";
import { Message } from "../../types";

interface ChatMessageProps {
  chatID: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chatID }) => {
  const [chats] = useAtom(chatsAtom);
  const chat = chats.find((chat) => chat.ID === chatID);

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <>
      {chat.messages.map((message: Message) => (
        <div
          key={message.ID}
          className={`flex items-end ${
            message.sender === "User" ? "justify-end" : ""
          }`}
        >
          {message.sender === "System" && (
            <div className="flex-shrink-0 mr-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full" />{" "}
              {/* TODO: アイコン */}
            </div>
          )}
          <div
            className={`rounded p-2 ${
              message.sender === "User" ? "bg-blue-200" : "bg-gray-500"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessage;

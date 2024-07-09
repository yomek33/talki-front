import React from "react";
import { Message, Chat } from "../../types";

interface ChatMessageProps {
  chat: Chat;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  if (!chat) {
    return <div>Chat not found</div>;
  }

  if (!chat.Messages || !Array.isArray(chat.Messages)) {
    return <div>No Messages available</div>;
  }

  console.log("Created chat:", chat);

  return (
    <>
      {chat.Messages.map((message: Message) => (
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

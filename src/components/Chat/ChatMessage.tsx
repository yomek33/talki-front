import React from "react";
import { Message as MessageType } from "../../types";

interface ChatMessageProps {
  chatID: number;
  messages: MessageType[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chatID, messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No Messages available</div>;
  }

  return (
    <>
      {messages.map((message: MessageType) => (
        <div
          key={message.ID}
          className={`flex items-end ${
            message.sender_type === "user" ? "justify-end" : ""
          }`}
        >
          {message.sender_type === "bot" && (
            <div className="flex-shrink-0 mr-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
            </div>
          )}
          <div
            className={`rounded p-2 ${
              message.sender_type === "user" ? "bg-blue-200" : "bg-gray-500"
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

import React, { useState } from "react";
import { useAtom } from "jotai";
import { addMessageToChatAtom } from "../../globalState/chat";
import { Message } from "../../types";
interface ChatFormProps {
  chatID: number;
}

const ChatForm: React.FC<ChatFormProps> = ({ chatID }) => {
  const [input, setInput] = useState<string>("");
  const [, addMessageToChat] = useAtom(addMessageToChatAtom);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messagePayload: Omit<Message, "ID" | "createdAt"> = {
      content: input,
      materialID: 0,
      chatID,
      sender: "User",
    };

    try {
      await addMessageToChat({
        chatID,
        message: messagePayload,
      });
      setInput("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-gray-200 flex justify-between items-center"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mr-2 rounded focus:outline-none text-gray-800"
        placeholder="メッセージを入力..."
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        送信
      </button>
    </form>
  );
};

export default ChatForm;

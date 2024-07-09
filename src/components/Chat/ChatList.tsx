// import React, { useEffect, useContext } from "react";
// import { useAtom } from "jotai";
// import { chatsAtom, fetchChatsByMaterialIdAtom } from "../../globalState/chat";
// import { useChatApi } from "../../services/api/chatApi";
// import { User } from "../../types";
// import { AuthContext } from "../../services/AuthProvider";

// interface ChatListProps {
//   user: User;
//   materialId: number;
//   onSelectChat: (chatID: number) => void;
// }

// const ChatList: React.FC<ChatListProps> = ({
//   user,
//   materialId,
//   onSelectChat,
// }) => {
//   const [chats, setChats] = useAtom(chatsAtom);
//   const [, fetchChats] = useAtom(fetchChatsByMaterialIdAtom);
//   const { createChat } = useChatApi();
//   const authContext = useContext(AuthContext);
//   const idToken = authContext?.idToken;

//   useEffect(() => {
//     const fetchChatsForMaterial = async () => {
//       try {
//         await fetchChats(materialId, idToken);
//       } catch (error) {
//         console.error("Failed to fetch chats", error);
//       }
//     };

//     fetchChatsForMaterial();
//   }, [fetchChats, materialId]);

// const handleCreateChat = async () => {
//   if (!idToken) {
//     console.error("User is not authenticated");
//     return;
//   }

//   try {
//     const newChat = await createChat(materialId, user.uid, idToken);
//     setChats((prevChats) => [...prevChats, newChat]);
//   } catch (error) {
//     console.error("Failed to create chat", error);
//   }
// };

//   return (
//     <div className="chat-list">
//       {chats
//         .filter((chat) => chat.materialID === materialId)
//         .map((chat) => (
//           <div
//             key={chat.ID}
//             onClick={() => onSelectChat(chat.ID)}
//             className="cursor-pointer p-2 hover:bg-gray-200"
//           >
//             {chat.detail}
//           </div>
//         ))}
//       <button
//         onClick={handleCreateChat}
//         className="create-chat-button p-2 bg-blue-500 text-white rounded mt-3"
//       >
//         新しいチャットを作成
//       </button>
//     </div>
//   );
// };

// export default ChatList;

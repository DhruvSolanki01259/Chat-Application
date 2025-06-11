import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Messages from "../messages/Messages";

import { TiMessages } from "react-icons/ti";
import MessageInput from "../messages/MessageInput";
import { useSocketContext } from "../../context/SocketContext";
import { useConversationStore } from "../../store/conversationStore";

const MobileMessageContainer = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(String(selectedConversation?._id));

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='flex flex-col h-full'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='px-4 py-2 mb-2 rounded-lg backdrop-filter backdrop-blur-lg text-white flex items-center gap-2 border-b border-slate-700'>
            <span className='text-gray-300 font-medium'>To:</span>
            <span className='text-white font-semibold'>
              {selectedConversation.fullName}
            </span>
            <span className='ml-auto text-sm text-rose-500'>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* Messages List */}
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>

          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { user } = useAuthStore();

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center text-base sm:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {user.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl' />
      </div>
    </div>
  );
};

export default MobileMessageContainer;

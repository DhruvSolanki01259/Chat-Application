import React from "react";
import { useConversationStore } from "../../store/conversationStore";
import { useAuthStore } from "../../store/authStore";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { user } = useAuthStore();
  const { selectedConversation } = useConversationStore();
  const fromMe = message.senderId === user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const formattedDate = extractTime(message.createdAt);
  const profilePic = fromMe ? user.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-rose-500" : "bg-gray-700";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Tailwind CSS chat bubble component'
            src={profilePic}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;

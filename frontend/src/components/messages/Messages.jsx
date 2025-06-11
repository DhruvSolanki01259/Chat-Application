import { useEffect, useRef } from "react";
import { useConversationStore } from "../../store/conversationStore";
import Message from "./Message";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import useListenMessages from "../../hooks/listenMessages";

const Messages = () => {
  const { messages, getMessages, receiverId, loadingMessages } =
    useConversationStore();
  useListenMessages();

  // console.log(receiverId);
  // console.log(messages);

  const lastMessagedRef = useRef();

  useEffect(() => {
    // console.log("Current Receiver ID: ", receiverId);
    if (receiverId) getMessages(receiverId);
  }, [receiverId, getMessages]);

  useEffect(() => {
    lastMessagedRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loadingMessages &&
        messages.length > 0 &&
        messages.map((message) => (
          <div
            key={message._id}
            ref={lastMessagedRef}>
            <Message message={message} />
          </div>
        ))}
      {loadingMessages &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loadingMessages && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;

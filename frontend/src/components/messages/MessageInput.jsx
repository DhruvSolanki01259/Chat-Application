import { BsSend } from "react-icons/bs";
import { useConversationStore } from "../../store/conversationStore";
import { useState } from "react";
import Loader from "../spinner/Loader";
import { toast } from "react-hot-toast";

const MessageInput = () => {
  const { selectedConversation, sendingMessage, sendMessages } =
    useConversationStore();

  const [message, setMessage] = useState("");
  const id = selectedConversation?._id;

  const formatMessage = (text) => {
    const words = text.trim().split(/\s+/);
    const lines = [];
    let currentLine = "";

    for (let word of words) {
      // Break long single words into chunks
      if (word.length > 20) {
        const chunks = word.match(/.{1,20}/g); // chunks of 20 characters
        for (let chunk of chunks) {
          if (currentLine.length + chunk.length + 1 > 30) {
            lines.push(currentLine);
            currentLine = chunk;
          } else {
            currentLine += (currentLine ? " " : "") + chunk;
          }
        }
      } else {
        if (
          currentLine.length + word.length + 1 > 30 ||
          currentLine.split(" ").length >= 4
        ) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += (currentLine ? " " : "") + word;
        }
      }
    }

    if (currentLine) lines.push(currentLine);

    return lines.join("\n");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message) {
      toast.error("Please enter a message.");
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return toast.error("Please enter a message.");

    const formattedMessage = formatMessage(message);

    try {
      await sendMessages(id, formattedMessage);
      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      console.error("Send Error:", error.message);
      toast.error(error?.message || "Failed to send message.");
    }
  };

  return (
    <form
      className='px-4 my-3'
      onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full input input-bordered h-10 rounded-lg pr-10 bg-transparent text-white border border-slate-700 placeholder-slate-400 focus:border-rose-500 transition'
          placeholder='Send a message'
        />
        <button
          type='submit'
          className='absolute inset-y-0 right-3 flex items-center text-rose-500 hover:text-white transition-colors duration-200'>
          {sendingMessage ? <Loader /> : <BsSend className='w-5 h-5' />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

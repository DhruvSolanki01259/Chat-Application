import { useConversationStore } from "../../store/conversationStore";

const MobileConversation = ({ conversation }) => {
  const { setReceiverId, selectedConversation, setSelectedConversation } =
    useConversationStore();

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-3 items-center hover:bg-rose-600 hover:bg-opacity-30 rounded-lg p-2 py-2 cursor-pointer transition
          ${isSelected ? "bg-rose-600" : ""}
        `}
        onClick={() => {
          // console.log("CONVERSATION COMPONENT");
          setSelectedConversation(conversation);
          setReceiverId(conversation._id);
        }}>
        {/* Avatar */}
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img
              src={conversation.profilePic}
              alt='user avatar'
            />
          </div>
        </div>
      </div>

      {/* {!lastIdx && <div className='divider my-1 py-0 h-px bg-slate-700' />} */}
    </>
  );
};

export default MobileConversation;

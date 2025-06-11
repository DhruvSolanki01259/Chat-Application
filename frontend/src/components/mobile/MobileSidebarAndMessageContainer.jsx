import MobileConversations from "./MobileConversations";
import MobileMessageContainer from "./MobileMessageContainer";

const MobileSidebarAndMessageContainer = () => {
  return (
    <div className='flex h-[60vh] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
      {/* SideBar with Only Profile Pics */}
      <div className='w-20 h-full border-r border-slate-500 overflow-y-auto'>
        <MobileConversations />
      </div>

      {/* Message Container */}
      <div className='flex-1 overflow-hidden'>
        <MobileMessageContainer />
      </div>
    </div>
  );
};

export default MobileSidebarAndMessageContainer;

import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import MobileSearchBar from "../../components/mobile/MobileSearchBar";
import MobileFooter from "../../components/mobile/MobileFooter";
import MobileSidebarAndMessageContainer from "../../components/mobile/MobileSidebarAndMessageContainer";
import useMobileScreenSize from "../../hooks/mobileScreenSize";

const Inbox = () => {
  const { width } = useMobileScreenSize();
  const isMobile = width < 640;
  // console.log("Mobile Screen", isMobile);

  return (
    <>
      {isMobile ? (
        <div className='flex flex-col sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <MobileSearchBar />

          <MobileSidebarAndMessageContainer />

          <MobileFooter />
        </div>
      ) : (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <Sidebar />
          <MessageContainer />
        </div>
      )}
    </>
  );
};

export default Inbox;

import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import Loader from "../spinner/Loader";
import { getRandomEmoji } from "../../utils/emojis";
import MobileConversation from "./MobileConversation";

const MobileConversations = () => {
  const { users, error, loading, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className='flex flex-col h-full'>
      {loading && (
        <div className='flex justify-center items-center flex-1'>
          <Loader />
        </div>
      )}
      {!loading && users.length === 0 && (
        <div className='flex justify-center items-center flex-1'>
          <Loader />
        </div>
      )}
      {!loading && users.length > 0 && (
        <div className='py-2 flex flex-col overflow-y-auto'>
          {Array.isArray(users) && users.length > 0 && (
            <div className='py-2 flex flex-col overflow-y-auto'>
              {users.map((user, idx) => (
                <MobileConversation
                  key={user._id}
                  conversation={user}
                  emoji={getRandomEmoji()}
                  lastIdx={idx === users.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {error && <p className='text-red-500 text-center mt-2'>Error: {error}</p>}
    </div>
  );
};

export default MobileConversations;

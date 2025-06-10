import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import Conversation from "./Conversation";
import Loader from "../spinner/Loader";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { users, error, loading, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // console.log(users);

  return (
    <div>
      {loading && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
      {users.length === 0 && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
      <div className='py-2 flex flex-col overflow-auto'>
        {users.map((user, idx) => (
          <Conversation
            key={user._id}
            conversation={user}
            emoji={getRandomEmoji()}
            lastIdx={idx === users.length - 1}
          />
        ))}
      </div>
      {error && <p className='text-red-500'>Error: {error}</p>}
    </div>
  );
};

export default Conversations;

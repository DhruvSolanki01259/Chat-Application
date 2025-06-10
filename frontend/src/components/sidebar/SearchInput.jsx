import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useConversationStore } from "../../store/conversationStore";
import { toast } from "react-hot-toast";
import { useUserStore } from "../../store/userStore";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { getMessages, setSelectedConversation } = useConversationStore();
  const { users } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = users.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      getMessages(conversation._id);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        className='input input-bordered rounded-full bg-transparent text-gray border-slate-700 placeholder-slate-400 focus:border-rose-500'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit'
        className='btn btn-circle bg-rose-600 text-white border border-rose-600 hover:bg-transparent hover:text-white transition'>
        <IoSearchSharp className='w-6 h-6' />
      </button>
    </form>
  );
};

export default SearchInput;

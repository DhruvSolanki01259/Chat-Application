import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type='text'
          className='w-full input input-bordered h-10 rounded-lg pr-10 bg-transparent text-white border border-slate-700 placeholder-slate-400 focus:border-rose-500 transition'
          placeholder='Send a message'
        />
        <button
          type='submit'
          className='absolute inset-y-0 right-3 flex items-center text-rose-500 hover:text-white transition-colors duration-200'>
          <BsSend className='w-5 h-5' />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

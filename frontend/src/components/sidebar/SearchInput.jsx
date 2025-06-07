import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        className='input input-bordered rounded-full bg-transparent text-gray border-slate-700 placeholder-slate-400 focus:border-rose-500'
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

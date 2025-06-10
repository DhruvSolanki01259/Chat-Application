import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Home = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 text-center'>
      <h1 className='text-5xl font-bold text-white mb-3'>
        Hello,{" "}
        <span className='text-rose-500'>
          {isAuthenticated ? user.fullName : "Friend!"}
        </span>
      </h1>
      <p className='text-xl text-white mb-6'>Welcome back to ChatApp 👋</p>

      <div className='flex justify-center gap-4'>
        <Link
          to='/profile'
          className='btn btn-sm text-base bg-rose-500 text-white border border-rose-500 hover:bg-transparent hover:text-white rounded-lg'>
          Profile
        </Link>
        <Link
          to='/inbox'
          className='btn btn-sm text-base bg-rose-500 text-white border border-rose-500 hover:bg-transparent hover:text-white rounded-lg'>
          Inbox
        </Link>
      </div>
    </div>
  );
};

export default Home;

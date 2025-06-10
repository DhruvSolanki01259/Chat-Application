import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 text-center'>
      <h1 className='text-6xl font-bold text-white mb-4'>404</h1>
      <h2 className='text-2xl font-semibold text-white mb-6'>
        Page Not Found
        <span className='text-rose-600'> ChatApp</span>
      </h2>
      <p className='text-white mb-6'>
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to='/'
        className='btn text-base bg-rose-500 text-white border border-rose-500 hover:bg-transparent hover:text-white rounded-lg shadow-lg'>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

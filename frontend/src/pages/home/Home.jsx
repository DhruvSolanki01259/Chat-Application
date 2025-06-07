const Home = () => {
  return (
    <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 text-center'>
      <h1 className='text-4xl font-bold text-white mb-2'>
        Hello, <span className='text-rose-500'>Friend!</span>
      </h1>
      <p className='text-lg text-white mb-6'>Welcome back to ChatApp 👋</p>

      <div className='flex justify-center gap-4'>
        <a
          href='/profile'
          className='btn btn-sm bg-rose-500 text-white border border-rose-500 hover:bg-transparent hover:text-white rounded-lg'>
          Profile
        </a>
        <a
          href='/inbox'
          className='btn btn-sm bg-rose-500 text-white border border-rose-500 hover:bg-transparent hover:text-white rounded-lg'>
          Inbox
        </a>
      </div>
    </div>
  );
};

export default Home;

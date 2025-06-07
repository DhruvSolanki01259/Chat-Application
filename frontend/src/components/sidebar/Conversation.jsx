const Conversation = () => {
  return (
    <>
      <div className='flex gap-3 items-center hover:bg-rose-600 hover:bg-opacity-30 rounded-lg p-2 py-2 cursor-pointer transition'>
        {/* Avatar */}
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img
              src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
              alt='user avatar'
            />
          </div>
        </div>

        {/* User Info */}
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-white text-sm'>Dhruv Solanki</p>
            <span className='text-xl'>🎃</span>
          </div>
        </div>
      </div>

      <div className='divider my-1 py-0 h-px bg-slate-700' />
    </>
  );
};

export default Conversation;

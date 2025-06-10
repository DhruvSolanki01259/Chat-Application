import { BiHome } from "react-icons/bi";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    // <>
    //   {isMobile ? (
    //     <div className='border-r border-slate-500 p-4 flex flex-col'>

    //     </div>
    // ) : (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />

      <div className='divider px-3'></div>

      <div className='flex-grow overflow-auto'>
        <Conversations />
      </div>

      <div className='flex justify-between items-center pt-4'>
        <Link to='/'>
          <BiHome
            className='w-6 h-6 text-white cursor-pointer hover:text-rose-500 transition'
            title='Home'
          />
        </Link>
        <LogoutButton />
      </div>
    </div>
    //   )}
    // </>
  );
};
export default Sidebar;

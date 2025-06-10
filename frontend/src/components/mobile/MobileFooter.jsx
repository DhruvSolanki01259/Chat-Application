import React from "react";
import LogoutButton from "../sidebar/LogoutButton";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

const MobileFooter = () => {
  return (
    <div className='w-full flex justify-between items-center pt-3 px-3 py-3'>
      <Link to='/'>
        <BiHome
          className='w-6 h-6 text-white cursor-pointer hover:text-rose-500 transition'
          title='Home'
        />
      </Link>
      <LogoutButton />
    </div>
  );
};

export default MobileFooter;

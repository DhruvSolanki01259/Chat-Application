import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  // const { loading, logout } = useLogout();

  const loading = false;
  const logout = () => {};

  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut
          onClick={logout}
          className='w-6 h-6 text-white cursor-pointer hover:text-rose-500 transition'
          title='Logout'
        />
      ) : (
        <span className='loading loading-spinner text-rose-500' />
      )}
    </div>
  );
};

export default LogoutButton;

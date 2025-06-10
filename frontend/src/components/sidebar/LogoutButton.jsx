import { BiLogOut } from "react-icons/bi";
import { useAuthStore } from "../../store/authStore";
import Loader from "../spinner/Loader";
import { toast } from "react-hot-toast";

const LogoutButton = () => {
  const { loading, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut
          onClick={handleLogout}
          className='w-6 h-6 text-white cursor-pointer hover:text-rose-500 transition'
          title='Logout'
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LogoutButton;

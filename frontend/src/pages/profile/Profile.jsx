import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import Loader from "../../components/spinner/Loader";
import LogoutButton from "../../components/sidebar/LogoutButton";
import Home from "../home/Home";

const Profile = () => {
  const { user, loading } = useAuthStore();

  if (!user || loading) return <Loader />;

  return (
    <div className='flex flex-col md:flex-row max-w-4xl mx-auto mt-10 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-lg shadow-lg overflow-hidden'>
      {/* Left - Profile Image */}
      <div className='w-full md:w-2/5 p-6 flex flex-col items-center justify-center bg-gray-700 bg-opacity-20'>
        <div className='w-40 h-40 rounded-full border-4 border-rose-500 overflow-hidden mb-4'>
          <img
            src={user.profilePic}
            alt='Profile Avatar'
            className='w-full h-full object-cover'
          />
        </div>
        <h2 className='text-xl text-white font-semibold'>{user.fullName}</h2>
        <p className='text-gray-300'>{user.username}</p>
      </div>

      {/* Right - Details and Logout */}
      <div className='w-full md:w-3/5 p-6 text-white flex flex-col'>
        <h3 className='text-2xl font-bold mb-4 border-b pb-2 border-rose-500'>
          User Details
        </h3>
        <div className='space-y-2'>
          <p>
            <span className='font-semibold text-rose-500'>Full Name:</span>{" "}
            {user.fullName}
          </p>
          <p>
            <span className='font-semibold text-rose-500'>Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className='font-semibold text-rose-500'>Gender:</span>{" "}
            {user.gender}
          </p>
        </div>

        <div className='mt-8 flex justify-center gap-6'>
          <Link
            to={"/"}
            className='text-white hover:underline transition-transform duration-200 hover:scale-105'>
            Back to Home?
          </Link>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;

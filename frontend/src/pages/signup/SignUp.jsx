import { Link, useNavigate } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Loader from "../../components/spinner/Loader";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const { loading, error, signup } = useAuthStore();

  const handleCheckboxChange = (gender) => {
    setGender(gender);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !gender) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await signup(fullName, email, password, confirmPassword, gender);
      if (useAuthStore.getState().isAuthenticated) {
        toast.success("Welcome to Chat App.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
          <span className='text-rose-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Dhruv Solanki'
              className='w-full input input-bordered h-10 rounded-lg'
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='dhruvsolanki@gmail.com'
              className='w-full input input-bordered h-10 rounded-lg'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10 rounded-lg'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10 rounded-lg'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={gender}
          />

          <Link
            className='text-sm hover:underline mt-2 inline-block transition-transform duration-200 hover:scale-105'
            to='/login'>
            Already have an account?
          </Link>

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <div>
            <button
              className='btn btn-block btn-sm mt-2 bg-rose-600 text-white border border-rose-600 hover:bg-transparent hover:text-white rounded-lg'
              disabled={loading}>
              {loading ? <Loader /> : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

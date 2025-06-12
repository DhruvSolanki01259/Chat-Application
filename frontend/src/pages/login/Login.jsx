import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Loader from "../../components/spinner/Loader";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { loading, error, login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.error("Only @gmail.com emails are allowed.");
      return;
    }

    try {
      await login(email, password);
      if (useAuthStore.getState().isAuthenticated) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-rose-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='text'
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

          <Link
            className='text-sm hover:underline mt-2 inline-block transition-transform duration-200 hover:scale-105'
            to='/signup'>
            {"Don't"} have an account?
          </Link>

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <div>
            <button
              className='btn btn-block btn-sm mt-2 bg-rose-600 text-white border border-rose-600 hover:bg-transparent hover:text-white rounded-lg'
              disabled={loading}>
              {loading ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

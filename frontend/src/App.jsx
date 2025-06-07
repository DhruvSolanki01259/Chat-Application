import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/404/NotFound";

const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='*'
          element={<NotFound />}
          replace
        />
      </Routes>
    </div>
  );
};

export default App;

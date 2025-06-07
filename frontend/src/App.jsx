import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/404/NotFound";
import Inbox from "./pages/inbox/Inbox";

const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route
          path='/'
          element={<Home />}
          replace
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
          path='/inbox'
          element={<Inbox />}
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

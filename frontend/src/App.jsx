import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/404/NotFound";
import Inbox from "./pages/inbox/Inbox";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  // console.log(`protectedroute error: ${isAuthenticated}`);

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  // console.log(`redirect error: ${isAuthenticated}`);

  if (isAuthenticated) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};

const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/inbox'
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
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

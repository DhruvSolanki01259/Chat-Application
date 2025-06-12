import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuthStore } from "../store/authStore";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log(onlineUsers);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      const socket = io("https://simple-chat-application-du4o.onrender.com", {
        query: { userId: user._id },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

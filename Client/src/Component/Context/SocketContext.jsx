import { createContext, useContext, useEffect, useState } from "react";
import { UseAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();
//  use the socket context
export const UseSocketContext = () => {
  return useContext(SocketContext);
};
// Socket Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authuser] = UseAuth();

  useEffect(() => {
    if (authuser) {
      const socketInstance = io("http://localhost:8002", {
        query: { userId: authuser.user._id },
      });

      setSocket(socketInstance);
      // event pass online users
      socketInstance.on("getonline", (users) => {
        setOnlineUsers(users);
        // console.log("Online users updated:", users);
      });

      return () => {
        socketInstance.close();
        setOnlineUsers([]);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authuser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

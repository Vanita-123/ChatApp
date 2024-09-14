import { useEffect } from "react";
import UseConversation from "../StateMangement/UseConversation";
import { UseSocketContext } from "./SocketContext.jsx";
function UseGetSocketMessage() {
  const { socket } = UseSocketContext();
  const { messages, setMessages } = UseConversation();
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket, messages, setMessages]);
}

export default UseGetSocketMessage;

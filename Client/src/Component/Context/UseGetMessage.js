import { useEffect, useState } from "react";
import axios from "axios";
import UseConversation from "../StateMangement/UseConversation";

function UseGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessages(response.data.messages); // data  pass in the backend and also same name in fetch data and model
        } catch (error) {
          console.error("Error in UseGetMessage:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);

  return {
    messages,
    loading,
  };
}

export default UseGetMessage;

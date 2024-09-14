import { useState } from "react";
import axios from "axios";
import UseConversation from "../StateMangement/UseConversation.js";

function UseSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        // api call sending the message
        const response = await axios.post(
          `api/message/send/${selectedConversation._id}`,
          { message }
        );
        setMessages([...messages, response.data.newMessage]); // data  pass in the backend and also same name in fetch data and model
        setLoading(false);
      } catch (error) {
        console.error("Error in Send Message:", error);
        setLoading(false);
      }
    }
  };

  return {
    loading,
    sendMessages,
  };
}

export default UseSendMessage;

import { MdSend } from "react-icons/md";
import { useState } from "react";
import UseSendMessage from "../Context/UseSendMessage.js";

function Type() {
  const { loading, sendMessages } = UseSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-700 text-center">
        <div className="w-[70%] py-1 px-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here"
            className="grow outline-none bg-slate-900 input input-bordered w-full border-[1px] border-gray-700"
          />
        </div>
        <button className="button button-primary" disabled={loading}>
          <MdSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Type;

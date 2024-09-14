import { useEffect, useRef } from "react";
import UseGetMessage from "../Context/UseGetMessage.js";
import Loading from "../Page/Loading.jsx";
import Messages from "./Messages";
import UseGetSocketMessage from "../Context/UseGetSocketMessage.jsx";

function Message() {
  const { messages, loading } = UseGetMessage();
  UseGetSocketMessage();
  const lastMessageRef = useRef();
  // console.log(messages)
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      style={{ minHeight: "calc(92vh - 8vh)" }}
      className="flex-1 py-2 overflow-y-auto"
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Messages message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say Hi! To start the conversation
          </p>
        </div>
      )}
    </div>
  );
}
export default Message;

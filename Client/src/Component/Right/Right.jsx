import { useEffect } from "react";
import UseConversation from "../StateMangement/UseConversation.js";
import ChatUser from "./ChatUser";
import Message from "./Message";
import Type from "./Type";
import { UseAuth } from "../Context/AuthProvider.jsx";
export function Right() {
  const { selectedConversation, setSelectedConversation } = UseConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <>
      <div className="w-full border border-white bg-slate-950  text-gray-300">
        <div>
          {!selectedConversation ? (
            <NoChat />
          ) : (
            <>
              <ChatUser />
              <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: "calc(88vh - 8vh)" }}
              >
                <Message />
              </div>
              <Type />
            </>
          )}
        </div>
      </div>
    </>
  );
}

const NoChat = () => {
  const [authuser] = UseAuth();
  return (
    <>
      {/* <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <p className="text-xl text-white"></p>
        </label>
      </div> */}
      <div className="flex h-screen items-center justify-center">
        <h1 className="font-semibold text-center text-xl">
          Welcome <span className="text-green-500"> {authuser.user.name} </span>
          <br />
          Select a Conversation to start a chat
        </h1>
      </div>
    </>
  );
};

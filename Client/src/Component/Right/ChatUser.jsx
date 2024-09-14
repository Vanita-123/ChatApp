import UseConversation from "../StateMangement/UseConversation.js";
import { UseSocketContext } from "../Context/SocketContext";
function ChatUser() {
  const { selectedConversation } = UseConversation();
  // console.log(selectedConversation);

  const { onlineUsers } = UseSocketContext();
  const getOnlineUserStatus = (userId) => {
    // check to online offline user
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
  return (
    <div>
      <div className="flex space-x-4 pl-5 pt-5  h-[12vh] bg-gray-700 hover:bg-slate-600 duration-300 cursor-pointer">
        <div>
          <div className={`avatar Online `}>
            <div className="w-14 rounded-full ">
              <img src="data:image/jpeg;base64,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" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl "> {selectedConversation.name}</h1>
          <span className="text-sm">
            {getOnlineUserStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;


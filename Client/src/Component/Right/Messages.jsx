function Messages({ message }) {
  const authuser = JSON.parse(localStorage.getItem("chat"));
  const itsme = message.senderId === authuser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-green-400" : "";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
          <div className="text-xs text-black">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; //  receiver ID
    const senderId = req.user._id;

    //  conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Save the new message and update the conversation
    await newMessage.save();
    conversation.messages.push(newMessage._id); // push method using the message ID to the conversation
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with success
    res.status(201).json({
      message: "Message sent successfully!",
      newMessage,
    });
  } catch (error) {
    console.error(`Error in sending message: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params; // Receiver ID
    const senderId = req.user._id; // Sender ID from authenticated user

    // Find conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages"); // Correctly populate messages

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }

    //  access messages from the conversation object
    const messages = conversation.messages;
    res.status(200).json({ messages });
  } catch (error) {
    console.log(`Error messages: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      requied: true,
      maxlength: 1000,
      trim: true,
      vaildate: [
        {
          validator: (value) => value.length > 0,
          message: "Message cannot be empty",
        },
      ],
    },
    createdAt: { type: Date, default: Date.now },
  },

  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

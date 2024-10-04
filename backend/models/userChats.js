import mongoose from "mongoose";

//  这个用户的多个对话信息
const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default:Date.now()
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.userchats ||
  mongoose.model("userchats", userChatsSchema);
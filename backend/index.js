import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import path from "path";
import url, { fileURLToPath } from "url";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // 权限验证
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};


// SDK initialization
var imagekit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_ENDPOINT
});

app.get("/api/upload", (req, res) => {
  console.log("/api/upload");
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats",  ClerkExpressRequireAuth(), async (req, res) => {

  const userId = req.auth.userId
  const { text } = req.body;

  // console.log(text);

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });

    
    if (!userChats.length) {

      // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();

    } else {

      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);

    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

// 测试 clerk
// app.get("/api/test", (req, res) => {
//   console.log("/api/test")
//   res.send("/api/test it works!")
// })

// app.get("/api/test1",  ClerkExpressRequireAuth(), (req, res) => {
//   const userId = req.auth.userId
//   console.log("userId +++++++++++ ", userId)
//   console.log("/api/test1")
//   res.send("/api/test1 it works!")
// })

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(401).send('Unauthenticated!')
})

app.listen(port, () => {
  connect();
  console.log(`Server running on ${port}`);
});

import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import path from "path";
import url, { fileURLToPath } from "url";

const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


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

app.get("/api/test", (req, res) => {
  res.send("it works!")
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

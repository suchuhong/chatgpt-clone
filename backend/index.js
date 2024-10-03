import express from "express";

const port = process.env.PORT || 3100;
const app = express();

app.get("/api/test", (req, res) => {
  res.send("it works!")
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

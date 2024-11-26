// 208108712 Yehonatan Katz
// 209364769 Or Shohat

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const commentRouter = require("./routes/commentRouter");
const postRouter = require("./routes/postRouter");
app.use("/comments", commentRouter);
app.use("/posts", postRouter)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
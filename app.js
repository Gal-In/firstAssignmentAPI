const express = require("express");
const app = express();
const postRoutes = require("./routes/postRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to db"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

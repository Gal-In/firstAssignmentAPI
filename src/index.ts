import express from "express";
import postRoutes from "./routes/postRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import usersRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const connectionURI = process.env.DB_CONNECTION ?? "";
mongoose.connect(connectionURI);
const db = mongoose.connection;
db.on("error", (e) => console.log(e));
db.once("open", () => console.log("connected to db"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

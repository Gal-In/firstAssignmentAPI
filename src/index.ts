import express from "express";
import postRoutes from "./routes/postRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import usersRoutes from "./routes/userRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

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
app.use("/auth", authenticationRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment",
      version: "1.0.0",
      description: "rest server description",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    senderId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const postModel = mongoose.model("Posts", postSchema);

export default postModel;

import mongoose from "mongoose";
const { Schema } = mongoose;

const commentsSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model("Comments", commentsSchema);

export default commentsModel;

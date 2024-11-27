const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  senderId: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;

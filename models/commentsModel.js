const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  postId: String,
  senderId: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model("Comments", commentsSchema);

module.exports = commentsModel;

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  date: { type: Date },
  name: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  name: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: [commentSchema],
  createdAt: {
    type: Date,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
});

const friendSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema],
  friendList: [friendSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

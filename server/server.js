const express = require("express");
const app = express();
const mongoose = require("./db");
const cors = require("cors");
const {
  getAllUsers,
  getUser,
  createUser,
  addPost,
  addComment,
  getAllComments,
  updateLike,
  getAllFriends,
  addFriend,
  deleteFriend,
  getSingleUser,
  deleteUser,
} = require("./controllers/userController");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.get("/api/users", getAllUsers);
app.get("/api/users/:user_id", getSingleUser);
app.delete("/api/users/:user_id", deleteUser);
app.post("/api/user", getUser);
app.post("/api/users", createUser);
app.post("/api/users/:user_id/post", addPost);
app.put("/api/users/:user_id/post/:post_id", updateLike);
app.post("/api/users/:user_id/:post_id/comment", addComment);
app.get("/api/user/:post_id/comment", getAllComments);
app.get("/api/user/:user_id/friends", getAllFriends);
app.post("/api/user/:user_id/friends", addFriend);
app.delete("/api/user/:user_id/friends/:friend_id", deleteFriend);

app.listen(PORT, () => console.log(`API is running...`));

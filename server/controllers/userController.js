const User = require("../models/userModel");

/**
 * @route /api/users
 * @method GET
 * @desc get all users
 */
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

/**
 * @route /api/users/:user_id
 * @method GET
 * @desc get a single user
 */
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id });
  res.send(user);
};

/**
 * @route /api/user
 * @method POST
 * @desc get a single user
 */
const getUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.send(user);
  } else {
    res.send({ Failed: "No user found" });
  }
};

const createUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.send({ Failed: "This email already used" });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (newUser) {
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.send({ Failed: "unable to create user" });
    }
  }
};

/**
 * @route /api/users/:user_id/post
 * @method POST
 * @desc make a post
 */
const addPost = async (req, res) => {
  const users = await User.findOne({ _id: req.params.user_id });
  // users.posts = [];
  // await users.save();
  users.posts.unshift({
    content: req.body.content,
    createdAt: new Date(),
    name: req.body.name,
    user: req.body.user_id,
  });
  await users.save();
  res.send(users.posts[0]);
};

/**
 * @route /api/users/:user_id/:post_id/comment
 * @method POST
 * @desc add a comment to a post
 */
const addComment = async (req, res) => {
  const postUser = await User.findOne({ _id: req.params.user_id });
  const post_id = req.params.post_id;
  const comment = {
    comment: req.body.comment,
    name: req.body.commentUser,
    user: req.body.user_id,
    date: Date.now(),
  };
  postUser.posts = postUser.posts.map((post) => {
    if (post.id === post_id) {
      post.comment.unshift(comment);
    }
    return post;
  });
  await postUser.save();
  const post = postUser.posts.filter((post) => post.id === post_id);
  console.log(post);
  res.send(post[0].comment[0]);
};

/**
 * @route /api/users/:user_id/post/:post_id
 * @method PUT
 * @desc update like or dislike
 */
const updateLike = async (req, res) => {
  const postUser = await User.findOne({ _id: req.params.user_id });
  const post_id = req.params.post_id;
  const like = req.body.like;
  postUser.posts = postUser.posts.map((post) => {
    if (post.id === post_id) {
      if (like) {
        post.like++;
      } else {
        post.dislike++;
      }
    }
    return post;
  });
  await postUser.save();
  res.send(postUser);
};

/**
 * @route /api/user/:post_id/comment
 * @method GET
 * @desc get all comment of a post
 */
const getAllComments = async (req, res) => {
  const postUser = await User.findOne({ email: req.body.email });
  const post_id = req.params.post_id;
  const comments = postUser.posts.filter((post) => post.id === post_id);
  res.send(comments);
};

/**
 * @route /api/user/:user_id/friends
 * @method GET
 * @desc get all friends of a user
 */
const getAllFriends = async (req, res) => {
  const users = await User.findOne({ _id: req.params.user_id });
  res.send(users.friendList);
};

/**
 * @route /api/user/:user_id/friends
 * @method POST
 * @desc add a friend
 */
const addFriend = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.params.user_id });
  const friend = {
    user: req.body.user_id,
    name: req.body.name,
    email: req.body.email,
  };
  currentUser.friendList.push(friend);
  await currentUser.save();
  res.send(currentUser);
};

/**
 * @route /api/user/:user_id/friends/:friend_id
 * @method DELETE
 * @desc delete a friend
 */
const deleteFriend = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.params.user_id });
  const friend_id = req.params.friend_id;
  currentUser.friendList = currentUser.friendList.filter(
    (friend) => friend.id !== friend_id
  );
  await currentUser.save();
  res.send(currentUser);
};

/**
 * @route /api/users/:user_id
 * @method DELETE
 * @desc delete a user
 */
const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id });
  await user.delete();
  res.send({ Success: "deleted" });
};
module.exports = {
  getAllUsers,
  getSingleUser,
  getUser,
  createUser,
  addPost,
  addComment,
  getAllComments,
  updateLike,
  getAllFriends,
  addFriend,
  deleteFriend,
  deleteUser,
};

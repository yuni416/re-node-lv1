const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  // postId: {
  //   autoIncrement: true,
  //   primaryKey: true,
  //   type: Number,
  //   unique: true,
  // },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Posts', postsSchema);

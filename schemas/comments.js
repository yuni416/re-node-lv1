const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  //   commentId: {
  //     autoIncrement: true,
  //     primaryKey: true,
  //     type: Number,
  //     unique: true,
  //   },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    defalt: Date.now(),
  },
});

// postSchema.set("timestamps",true);미국 시간

module.exports = mongoose.model('comments', commentSchema);

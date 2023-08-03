const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  //   commentId: {
  //     autoIncrement: true,
  //     primaryKey: true,
  //     type: Number,
  //     unique: true,
  //   },
  postId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  content: {
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

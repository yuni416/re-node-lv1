const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const authMiddleware = require('../middleware/auth-middleware');

router.put('/:postId/likes', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;

  const like = await Likes.findOne({
    where: { postId, userId },
  });
  const post = await Posts.findOne({ where: { postId, userId } });
  console.log(post);

  if (like) {
    await Likes.destroy({ where: { postId, userId } });
    await Posts.update({ likes: post.likes - 1 }, { where: { postId } });
  } else {
    await Likes.create({ userId, postId });
    await Posts.update({ likes: post.likes + 1 }, { where: { postId } });
  }
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const likes = await Posts.findAll({ where: { postId } });
  return res.status(200).json({ message: `좋아요 개수: ${likes.length}` });
});

router.get('/posts', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const likeposts = await Likes.findAll({
    where: { userId },
    attributes: [],
    include: [
      {
        model: Posts,
        order: [['likes', 'DESC']],
        attributes: ['title', 'nickname', 'content', 'likes', 'createdAt', 'updatedAt'],
      },
    ],
  });
  return res.status(200).json({ likeposts });
});

module.exports = router;

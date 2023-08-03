const express = require('express');
const router = express.Router();
exports.router = router;

const Posts = require('../schemas/posts');

//전체 조회
router.get('/', async (req, res) => {
  const posts = await Posts.find().sort('-createdAt').exec();
  const search = posts.map((post) => {
    return { name: post.name, title: post.title, createdAt: post.createdAt };
  });

  res.json({ data: search });
});

//작성
router.post('/', async (req, res) => {
  const { postId, title, name, password, content } = req.body;
  const create = await Posts.create({ postId, title, name, password, content });

  res.json({ data: create });
});

//조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    where: { _id: postId },
    attributes: ['title', 'name', 'createdAt', 'content'],
  });

  res.json({ data: post });
});

//수정
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { name, password, title, content } = req.body;
  const post = await Posts.findOne({ _id: postId });

  if (password !== post.password) {
    throw res.status(400).json({ Message: '비밀번호가 일치하지 않습니다.' });
  } else {
    await Posts.updateOne({ _id: postId }, { $set: { name, title, content } });
  }
});

//삭제
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  const post = await Posts.findOne({ _id: postId });

  if (password !== post.password) {
    throw res.status(400).json({ Message: '비밀번호가 일치하지 않습니다.' });
  } else {
    await post.destroy({ postId });
  }
});

module.exports = router;

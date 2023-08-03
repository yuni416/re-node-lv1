const express = require('express');
const router = express.Router();
exports.router = router;

const Posts = require('../schemas/posts');
const authMiddleware = require('../middleware/auth-middleware');

//전체 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find().sort('-createdAt').exec();
    const search = posts.map((post) => {
      return { nickname: post.nickname, title: post.title, createdAt: post.createdAt };
    });

    res.status(200).json({ search });
  } catch {
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

//작성
router.post('/', authMiddleware, async (req, res) => {
  const { postId, title, nickname, password, content } = req.body;
  try {
    const create = await Posts.create({ postId, title, nickname, password, content });
    res.status(200).json({ create });
  } catch {
    res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

//조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findOne({
      where: { _id: postId },
      attributes: ['title', 'nickname', 'createdAt', 'content'],
    });

    res.status(200).json({ post });
  } catch {
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

//수정
router.put('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { nickname, title, content } = req.body;
  const post = await Posts.findOne({ _id: postId });

  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (userId !== post.userId) {
        throw res.status(403).json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
      }

      await Posts.updateOne({ _id: postId }, { $set: { nickname, title, content } });
      res.status(200).json({ message: '게시글을 수정했습니다.' });
    } catch {
      res.status(400).json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
    }
  } catch {
    res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
  }
});

//삭제
router.delete('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const post = await Posts.findOne({ _id: postId });

  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (userId !== post.userId) {
        throw res.status(403).json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
      }

      await post.deleteOne({ postId });
      res.status(200).json({ message: '게시글을 삭제했습니다.' });
    } catch {
      res.status(400).json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
    }
  } catch {
    res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
  }
});

module.exports = router;

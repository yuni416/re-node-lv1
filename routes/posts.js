const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Posts, Users } = require('../schemas/posts');
const authMiddleware = require('../middleware/auth-middleware');

//전체 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ['postId', 'UserId', 'nickname', 'title', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ posts });
  } catch {
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

//작성
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId } = res.locals.user;

  try {
    const user = await Users.findOne({ where: { userId } });
    const create = await Posts.create({ UserId: userId, nickname: user.nickname, title, content });
    res.status(200).json({ create });
  } catch {
    res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
  }
});

//조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const posts = await Posts.findOne({
      attributes: ['postId', 'UserId', 'nickname', 'title', 'content', 'createdAt', 'updatedAt'],
      where: { postId },
    });

    res.status(200).json({ posts });
  } catch {
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});

//수정
router.put('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const post = await Posts.findOne({ where: { postId } });

  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (userId !== post.userId) {
        throw res.status(403).json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
      }

      await Posts.updateOne(
        { title, content },
        { where: { [Op.and]: [{ postId }, { UserId: userId }] } }
      );
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

  const post = await Posts.findOne({ where: { postId } });

  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (userId !== post.userId) {
        throw res.status(403).json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
      }

      await post.destroy({ where: { postId: postId } });
      res.status(200).json({ message: '게시글을 삭제했습니다.' });
    } catch {
      res.status(400).json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
    }
  } catch {
    res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
  }
});

module.exports = router;

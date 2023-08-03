const express = require('express');
const router = express.Router();

const Posts = require('../schemas/posts');
const Comments = require('../schemas/comments');
const authMiddleware = require('../middleware/auth-middleware');

//조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Posts.find({ postId }).sort('-createdAt').exec();
    const search = comments.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        nickname: comment.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
    res.json({ comments: search });
  } catch {
    res.status(400).json({ errorMessage: '댓글 조회에 실패했습니다.' });
  }
});

//작성
router.post('/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { nickname } = res.locals.user;
  const { comment } = req.body;
  try {
    if (!postId) {
      throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다' });
    }
    if (!comment) {
      throw res.status(412).json({ errorMessage: '댓글 내용을 입력해주세요' });
    }
    await Comments.create({ postId, nickname, password, comment, createdAt });

    res.status(201).json({ message: '댓글을 작성했습니다.' });
  } catch {
    res.status(400).json({ errorMessage: '댓글 작성에 실패했습니다.' });
  }
});

//수정
router.put('/:postId/:commentId', authMiddleware, async (req, res) => {
  const { postId, commentId } = req.params;
  const { comment } = req.body;
  const { userId } = res.locals.user;
  const comments = await Comments.findById(commentId);
  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (!commentId) {
        throw res.status(404).json({ errorMessage: '댓글이 존재하지 않습니다.' });
      }
      if (userId !== comments.userId) {
        throw res.status(403).json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
      }
    } catch {
      res.status(400).json({ errorMessage: '댓글 수정이 정상적으로 처리되지 않았습니다.' });
    }
    await Comments.updateOne({ _id: commentId }, { $set: { comment: comment } });
  } catch {
    res.status(400).json({ errorMessage: '댓글 수정에 실패했습니다.' });
  }
});

//삭제
router.delete('/:postId/:commentId', authMiddleware, async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = res.locals.user;
  const comment = await Comments.findById(commentId);

  const comments = await Comments.findById(commentId);
  try {
    try {
      if (!postId) {
        throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }
      if (!commentId) {
        throw res.status(404).json({ errorMessage: '댓글이 존재하지 않습니다.' });
      }
      if (userId !== comments.userId) {
        throw res.status(403).json({ errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.' });
      }
      await Comments.deleteOne({ _id: commentId }, { $set: { comment: comment } });
      res.status(200).json({ message: '댓글을 삭제했습니다.' });
    } catch {
      res.status(400).json({ errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.' });
    }
  } catch {
    res.status(400).json({ errorMessage: '댓글 삭제에 실패했습니다.' });
  }
});

module.exports = router;

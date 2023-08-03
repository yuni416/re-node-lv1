const express = require('express');
const router = express.Router();

const Comments = require('../schemas/comment.js');

//조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const search = await Comments.find({ postId }).sort('-createdAt').exec();

  res.json({ data: search });
});

//작성
router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { name, password, content } = req.body;
  if (!content) {
    throw res.status(400).json({ errormessage: '댓글 내용을 입력해주세요' });
  }
  const create = await Comments.create({ postId, name, password, content, createdAt });

  res.json({ data: create });
});

//수정
router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { password, content } = req.body;
  const comment = await Comments.findById(commentId);
  if (!content) {
    throw res.status(400).json({ errormessage: '댓글 내용을 입력해주세요' });
  }
  if (password !== comment.password) {
    throw res.status(400).json({ errormessage: '비밀번호가 일치하지 않습니다.' });
  } else {
    await Comments.updateOne({ _id: commentId }, { $set: { content: content } });
  }
});

//삭제
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;
  const comment = await Comments.findById(commentId);

  if (password !== comment.password) {
    throw res.status(400).json({ errormessage: '비밀번호가 일치하지 않습니다.' });
  } else {
    await Comments.destroy({ _id: commentId });
  }
});

module.exports = router;

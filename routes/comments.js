const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware.js');

const CommentsController = require('../controller/commentscontroller');
const commentsController = new CommentsController();

router.post('/:postId', authMiddleware, commentsController.createComment);

router.get('/:postId', commentsController.getComments);

router.put('/:postId:commentId', authMiddleware, commentsController.updateComment);

router.delete('/:postId/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;

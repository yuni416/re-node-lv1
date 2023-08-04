const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const LikesController = require('../controller/likescontroller');
const likesController = new LikesController();

router.put('/posts/:postId/like', authMiddleware, likesController.postLike);

router.get('/like/posts', authMiddleware, likesController.findLikePosts);

module.exports = router;

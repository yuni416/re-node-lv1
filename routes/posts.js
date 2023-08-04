const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const PostsController = require('../controller/postscontroller');

const postsController = new PostsController();

router.post('/', authMiddleware, postsController.createPost);
router.get('/', postsController.getPosts);
router.get('/:post_id', postsController.getPostById);
router.put('/:post_id', authMiddleware, postsController.updatePost);
router.delete('/:post_id', authMiddleware, postsController.deletePost);

module.exports = router;

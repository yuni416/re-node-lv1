const PostsService = require('../service/postsservice');

class PostsController {
  postsService = new PostsService();

  getPosts = async (req, res) => {
    try {
      const posts = await this.postsService.getPosts();
      res.status(200).json({ posts });
    } catch {
      res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  createPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId, nickname } = res.locals.user;
    try {
      const create = await this.postsService.createPost({ userId, nickname, title, content });
      res.status(200).json({ create });
    } catch {
      res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };

  getPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.getPostById(postId);
      return res.status(200).json({ post });
    } catch {
      res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    try {
      try {
        if (!postId) {
          throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        if (userId !== post.userId) {
          throw res.status(403).json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
        }
        const update = await this.postsService.updatePost(postId, userId, title, content);
        res.status(200).json({ update });
      } catch {
        res.status(400).json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
      }
    } catch {
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    try {
      try {
        if (!postId) {
          throw res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        if (userId !== post.userId) {
          throw res.status(403).json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
        }
        const del = await this.postsService.deletePost(postId, userId);
        res.status(200).json({ del });
      } catch {
        res.status(400).json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
      }
    } catch {
      res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = PostsController;

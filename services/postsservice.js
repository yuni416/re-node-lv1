const PostsRepository = require('../repository/postsrepository');

class PostsService {
  postsRepository = new PostsRepository();

  getPosts = async () => {
    try {
      return await this.postsRepository.getPosts();
    } catch (error) {
      throw new Error('모집글 조회에 실패했습니다.');
    }
  };

  createPost = async ({ userId, title, content, nickname }) => {
    try {
      await this.postsRepository.createPost({ userId, title, content, nickname });
    } catch {
      throw new Error('모집글 작성에 실패했습니다.');
    }
  };

  getPostById = async (postId) => {
    try {
      return await this.postsRepository.getPostById(postId);
    } catch (error) {
      throw new Error('모집글 조회에 실패했습니다.');
    }
  };

  updatePost = async (postId, userId, title, content) => {
    try {
      await this.postsRepository.updatePost(postId, userId, title, content);
    } catch (error) {
      throw new Error('모집글 수정에 실패했습니다.');
    }
  };

  deletePost = async (postId, userId) => {
    try {
      await this.postsRepository.deletePost(postId, userId);
    } catch (error) {
      throw new Error('모집글 삭제에 실패했습니다.');
    }
  };
}

module.exports = PostsService;

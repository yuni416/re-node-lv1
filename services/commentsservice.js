const CommentsRepository = require('../repository/commentsrepository');

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComment = async (userId, postId, comment) => {
    try {
      await this.commentsRepository.createComment({ userId, postId, comment });
    } catch {
      throw new Error('댓글 검색에 실패했습니다.');
    }
  };

  findAllComment = async (postId) => {
    try {
      await this.commentsRepository.findAllComment(postId);
    } catch {
      throw new Error('댓글 검색에 실패했습니다.');
    }
  };

  findOneComment = async (commentId) => {
    try {
      await this.commentsRepository.findOneComment(commentId);
    } catch {
      throw new Error('댓글 검색에 실패했습니다.');
    }
  };

  updateComment = async ({ postId, userId, comment, commentId }) => {
    try {
      await this.commentsRepository.updateComment({ comment }, [{ postId, userId, commentId }]);
    } catch {
      throw new Error('댓글 수정에 실패했습니다.');
    }
  };

  deleteComment = async (userId, commentId) => {
    try {
      await this.commentsRepository.deleteComment([{ userId }, { commentId }]);
    } catch {
      throw new Error('댓글 삭제에 실패했습니다.');
    }
  };
}

module.exports = CommentsService;

const { Comments } = require('../models');

class CommentsRepository {
  createComment = async (data) => {
    return await Comments.create(data);
  };

  findAllComment = async (postId) => {
    const comment = Comments.findAll({ where: { postId } });
    return comment.map((comment) => {
      comment.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        postId: comment.postId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  findOneComment = async (commentId) => {
    return await Comments.findByPk(commentId);
  };

  updateComment = async (data, commentId) => {
    return await Comments.update(data, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    return await Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentsRepository;

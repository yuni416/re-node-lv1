const { Posts, Likes, Users } = require('../models');
const { Sequelize } = require('sequelize');

class LikesRepository {
  findOne = async (postId) => {
    return await Likes.findOne({ where: { postId } });
  };
  createOne = async (likes) => {
    return await Likes.create(likes);
  };
  deleteOne = async (postId) => {
    return await Likes.destroy({ where: { postId } });
  };
  findAllLikedPosts = async (postId) => {
    return await Likes.findAll({
      where: { where: { postId } },
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE PostId = Post.postId)`), 'likes'],
        ],
      },
      include: [{ model: Posts }, { model: Users }],
      raw: true,
      nest: true,
    });
  };
}

module.exports = LikesRepository;

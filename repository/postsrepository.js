const { Posts } = require('../models');

class PostsRepository {
  createPost = async (userId, title, content) => {
    await Posts.create({ userId, title, content });
  };
}
getPosts = async () => {
  const posts = await findAll(postId);

  posts.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return posts.map((posts) => {
    return {
      userId: posts.userId,
      title: posts.title,
      nickname: posts.nickname,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    };
  });
};

async () => {
  return await Posts.findAll({
    attributes: ['postId', 'UserId', 'title', 'content', 'createdAt'],
    order: [['createdAt', 'DESC']],
  });
};

getPostById = async (postId) => {
  return await Posts.findOne({
    attributes: ['postId', 'UserId', 'title', 'content', 'createdAt'],
    where: { postId },
  });
};

updatePost = async (postId, userId, title, content) => {
  await Posts.update({ title, content }, { where: { postId, userId } });
};

deletePost = async (postId, userId) => {
  await Posts.destroy({ where: { postId, userId } });
};

module.exports = PostsRepository;

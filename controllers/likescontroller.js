const LikesService = require('../service/likesservice');

class LikesController {
  likesService = new LikesService();

  postLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    if (!postId) throw res.status(404).json({ errorMessage: '게시글을 찾을 수 없습니다.' });

    const findLike = await this.likesService.findOne({ userId, postId });
    if (!findLike) {
      await this.likesService.createOne({ userId, postId });
      return res.status(200).json;
    } else {
      await this.likesService.deleteOne({ userId, postId });
      return res.status(200).json;
    }
  };
}

findLikePosts = async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const findlike = await this.likesService.findLikePosts({ userId, postId });
  if (!findlike) throw res.status(404).json({ errorMessage: '좋아요한 게시글이 없습니다.' });
  return {
    code: 201,
    result: findlike
      .sort((a, b) => b.likes - a.likes)
      .map((post) => {
        return {
          postId: post.Post.postId,
          nickname: post.User.nickname,
          title: post.Post.title,
          content: post.Post.content,
          likes: post.Post.likes,
          createAt: post.Post.createAt,
          updatedAt: post.Post.updatedAt,
        };
      }),
  };
};

module.exports = LikesController;

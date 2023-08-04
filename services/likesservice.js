const LikesRepository = require('../repository/likesrepository');

class LikesService {
  likesRepository = new LikesRepository();

  postLike = async ({ userId, postId }) => {
    try {
      await this.likesRepository.postLike({ userId, postId });
    } catch {
      throw new Error('검색에 실패했습니다.');
    }
  };

  findLikePosts = async ({ userId, postId }) => {
    try {
      await this.likesRepository.findLikePosts({ userId, postId });
    } catch {
      throw new Error('좋아요에 실패했습니다.');
    }
  };
}

module.exports = LikesService;

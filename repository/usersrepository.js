const { Users } = require('../models');

class UsersRepository {
  createOne = async (nickname, password) => {
    return await Users.create(nickname, password);
  };

  findOne = async (target) => {
    return await Users.findOne({ where: { [Op.and]: target }, raw: true, nest: true });
  };
}

module.exports = UsersRepository;

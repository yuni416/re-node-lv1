const jwt = require('jsonwebtoken');

const UsersRepository = require('../repository/usersrepository');

class UsersService {
  usersRepository = new UsersRepository();

  createOne = async ({ nickname, password }) => {
    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!nicknameRegex.test(nickname))
      throw res.status(412).json({ errorMessage: '닉네임의 형식이 일치하지 않습니다.' });

    if (password !== confirmPassword)
      throw res.status(412).json({ errorMessage: '패스워드가 일치하지 않습니다.' });

    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(password))
      throw res.status(412).json({ errorMessage: '패스워드 형식이 일치하지 않습니다.' });

    if (password.includes(nickname))
      throw res.status(412).json({ errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' });

    const existsUsers = await Users.findOne({ where: nickname });
    if (existsUsers) throw res.status(412).json({ errorMessage: '중복된 닉네임입니다.' });

    await this.usersRepository.createOne({ nickname, password });
  };

  login = async ({ nickname, password }) => {
    const user = await this.usersRepository.findOne([{ nickname }, { password }]);
    const token = jwt.sign({ userId: user.userId }, process.env.DB_SECRETKEY);
    return { token };
  };
}

module.exports = UsersService;

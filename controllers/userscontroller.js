const UsersService = require('../service/usersservice');

class UsersController {
  usersService = new UsersService();

  signUp = async (req, res) => {
    const { nickname, password } = req.body;
    const { result } = await this.usersService.createOne({ nickname, password });
    const existUser = await this.usersRepository.findOne([{ nickname }]);
    if (existUser) throw res.status(412).json({ errorMessage: '이미 사용중인 닉네임입니다.' });
    return res.status(200).json({ result });
  };

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const { token } = await this.usersService.login({ nickname, password });

    const findUser = await this.usersRepository.findOne([{ nickname }, { password }]);

    if (!findUser)
      throw res.status(412).json({ errorMessage: '아이디와 패스워드가 일치하지 않습니다.' });
    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({ token });
  };
}

module.exports = UsersController;

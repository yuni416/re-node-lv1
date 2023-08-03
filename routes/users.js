const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { Users } = require('../schemas/users');

//회원가입
router.post('/signup', async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;

  try {
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

    await Users.create({ nickname, password });

    res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
  } catch {
    throw res.status(400).json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

//로그인
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body;

  const user = await Users.findOne({ where: nickname });

  if (!user || password !== user.password) {
    throw res.status(400).json({
      errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
    });
  }

  const token = jwt.sign({ userId: user.userId }, 'secretkey');

  res.cookie('Authorization', `Bearer ${token}`);
  res.status(200).json({ token });
});

module.exports = router;

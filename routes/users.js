const express = require('express');
const router = express.Router();

const UsersController = require('../controller/userscontroller');
const usersController = new UsersController();

router.post('/signup', usersController.signUp);

router.post('/login', usersController.login);

module.exports = router;

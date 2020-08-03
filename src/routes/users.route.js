const { Router } = require('express');
const user_router = Router();
const { userRegister, userLogin, userLogOut } = require('../controllers/user.controller');
const { ValidateToken } = require('../libs/AuthToken');



user_router.post('/register', userRegister);
user_router.post('/login', userLogin);
user_router.post('/logout', ValidateToken, userLogOut);

module.exports = user_router;
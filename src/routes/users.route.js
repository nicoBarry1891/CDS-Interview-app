const { Router } = require('express');
const user_router = Router();
const { userRegister, userLogin, userLogOut } = require('../controllers/user.controller');
//const ValidateToken = require('../libs/ValidateToken');



user_router.post('/register', userRegister);
user_router.post('/login', userLogin);
//user_router.delete('/logout', ValidateToken, userLogOut);

module.exports = user_router;
const { Router } = require('express');
const user_router = Router();
const { userRegister, userLogin } = require('../controllers/user.controller');



user_router.post('/register', userRegister);
user_router.post('/login', userLogin);

module.exports = user_router;
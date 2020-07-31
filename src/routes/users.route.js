const { Router } = require('express');
const user_router = Router();
const { userRegister, userLogin, movies, addFavMovie, listFavMovies } = require('../controllers/user.controller');
const ValidateToken = require('../libs/ValidateToken');


//Register user
user_router.post('/register', userRegister);
user_router.post('/login', userLogin);
user_router.get('/movies', ValidateToken, movies);
user_router.post('/add-favorite', ValidateToken, addFavMovie);
user_router.get('/list-favorites', ValidateToken, listFavMovies);


module.exports = user_router;
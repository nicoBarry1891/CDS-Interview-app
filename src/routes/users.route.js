const { Router } = require('express');
const user_router = Router();
const { userRegister, userLogin, movies, addFavMovie, listFavMovies } = require('../controllers/user.controller');


//Register user
user_router.post('/register', userRegister);
user_router.post('/login', userLogin);
user_router.get('/movies', movies);
user_router.post('/add-favorite', addFavMovie);
user_router.get('/list-favorites', listFavMovies);


module.exports = user_router;
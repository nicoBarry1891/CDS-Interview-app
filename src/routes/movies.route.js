const { Router } = require('express');
const movies_route = Router();
const { movies, addFavMovie, listFavMovies } = require('../controllers/movies.controller');
const ValidateToken = require('../libs/ValidateToken');


movies_route.get('/list-movies/:search*?', ValidateToken, movies);
movies_route.post('/add-favorite', ValidateToken, addFavMovie);
movies_route.get('/list-favorites', ValidateToken, listFavMovies);


module.exports = movies_route;
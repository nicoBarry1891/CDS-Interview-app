const { getConnection } = require('../db');
const fetch = require('node-fetch');
const _ = require('underscore');
const auxFunctions = require('../libs/AuxFunctions');




const movies = async(req, res) => {
    let Url = '';
    req.params.search ? Url = await fetch(process.env.URL_TMDB.concat('search/movie?api_key=', process.env.API_TMDB_KEY, '&query=', req.params.search)) : Url = await fetch(process.env.URL_TMDB.concat('movie/popular?api_key=', process.env.API_TMDB_KEY));
    const jsonResponse = await Url.json();
    let movieRt = [];
    _.each(jsonResponse.results, (movies) => {
        movies.suggestionScore = auxFunctions.RandomNum(0, 99);
        movieRt.push(movies);
    });

    let sortedMovies = _.sortBy(movieRt, 'suggestionScore');
    res.status(200).json(sortedMovies);

}


const addFavMovie = async(req, res) => {

    try {
        req.body.addedAt = new Date();
        const addMovies = await getConnection().get('favorites').find({ user_id: req.userLogged }).get('movies').push(req.body).write();
        res.status(200).json({ msg: 'Successul operation' });
    } catch (err) {
        res.status(400).json({ msg: err });
    }

}

const listFavMovies = async(req, res) => {
    const favMovies = await getConnection().get('favorites').find({ user_id: req.userLogged }).value();
    let moviesRt = [];
    if (favMovies) {
        await _.each(favMovies.movies, (movies) => {
            movies.suggestionForTodayScore = auxFunctions.RandomNum(0, 99);
            moviesRt.push(movies);
        })
        let sortedMovies = _.sortBy(moviesRt, 'suggestionForTodayScore');
        res.status(200).json(sortedMovies);
    } else {
        res.status(401).send("Access denied");
    }

}

module.exports = {
    movies,
    addFavMovie,
    listFavMovies

}
const { getConnection } = require('../db');
const User = require('../models/user.model');
const { v1 } = require('uuid');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const _ = require('underscore');
const auxFunctions = require('../libs/AuxFunctions');


const userRegister = async(req, res) => {

    const newUser = new User(
        v1(),
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.password
    );
    const searchUser = await getConnection().get('users').find({ email: req.body.email }).value();
    if (!searchUser) {
        newUser.password = await newUser.encryptPass(newUser.password);
        await getConnection().get('users').push(newUser).write();
        await getConnection().get('favorites').push({ user_id: newUser.id, movies: [] }).write();
        res.status(200).send('Successful Sign up');

    } else {
        res.status(400).json('Email alredy exists');
    }
}

const userLogin = async(req, res) => {
    console.log(req.body.email);
    const searchUser = await getConnection().get('users').find({ email: req.body.email }).value();
    if (!searchUser) return res.status(400).json('Invalid email or password');
    const validatePassword = await User.validateUserPassword(req.body.password, searchUser.password);
    if (!validatePassword) return res.status(400).json('Incorrect password');
    const token = jwt.sign({ _id: searchUser.id }, process.env.SECURITY_TOKEN_KEY);
    res.header('authorization', token).send('Log in!');

}

const movies = async(req, res) => {

    //api_key=f05ad7b646c43325f9a089e1f1945e52
    const Url = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.API_TMDB_KEY);
    const jsonResponse = await Url.json();
    let movieRt = [];
    _.each(jsonResponse.results, (movies) => {
        movies.suggestionScore = auxFunctions.RandomNum(0, 99);
        movieRt.push(movies);
        // console.log(movies);
    });

    var sortedMovies = _.sortBy(movieRt, 'suggestionScore');
    res.status(200).json(sortedMovies);

}


const addFavMovie = async(req, res) => {
    req.body.addedAt = new Date();
    const addMovies = await getConnection().get('favorites').find({ user_id: req.userLogged }).get('movies').push(req.body).write();
    res.send('Recieved add');

}

const listFavMovies = async(req, res) => {
    const favMovies = await getConnection().get('favorites').find({ user_id: req.userLogged }).value();
    let moviesRt = [];
    _.each(favMovies.movies, (movies) => {
        movies.suggestionForTodayScore = auxFunctions.RandomNum(0, 99);
        moviesRt.push(movies);
        // console.log(moviesRt);

    });

    var sortedMovies = _.sortBy(moviesRt, 'suggestionForTodayScore');
    res.status(200).json(sortedMovies);


}



module.exports = {
    userRegister,
    userLogin,
    movies,
    addFavMovie,
    listFavMovies

}
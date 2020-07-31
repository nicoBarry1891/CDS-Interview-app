const { getConnection } = require('../db');
const User = require('../models/users.model');
const { v1 } = require('uuid');
const jwt = require('jsonwebtoken');
const { search } = require('../routes/users.route');
const fetch = require('node-fetch');
const _ = require('underscore');


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
        const savedUser = await getConnection().get('users').push(newUser).write();
        res.send('Successful Sign up');

    } else {
        res.status(500).json('Email alredy exists');
    }
}

const userLogin = async(req, res) => {

    const searchUser = await getConnection().get('users').find({ email: req.body.email }).value();
    if (!searchUser) return res.status(500).json('Invalid email or password');
    const validatePassword = await User.validateUserPassword(req.body.password, searchUser.password);
    if (!validatePassword) return res.status(500).json('Incorrect password');
    const token = jwt.sign({ _id: searchUser.id }, process.env.SECURITY_TOKEN_KEY);
    res.header('authorization', token).send('Log in!');

}

const movies = async(req, res) => {
    const searchUser = await getConnection().get('users').find({ id: req.userLogged }).value();
    //const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=f05ad7b646c43325f9a089e1f1945e52";
    const resMovies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f05ad7b646c43325f9a089e1f1945e52');
    const jsonResponse = await resMovies.json();
    var movieRt = [];
    _.each(jsonResponse.results, (movies, index) => {
        var numRandom = Math.floor(Math.random() * (99 - 0) + 0);
        movies.suggestionScore = numRandom;
        movieRt.push(movies);
        // console.log(movies);
    });

    var sortedMovies = _.sortBy(movieRt, 'suggestionScore');
    res.status(200).json(sortedMovies);
    //api_key=f05ad7b646c43325f9a089e1f1945e52

}


const addFavMovie = (req, res) => {
    res.send('Recieved login');

}

const listFavMovies = (req, res) => {
    res.send('Recieved login');

}



module.exports = {
    userRegister,
    userLogin,
    movies,
    addFavMovie,
    listFavMovies

}
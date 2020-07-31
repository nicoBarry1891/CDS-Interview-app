const { getConnection } = require('../db');
const User = require('../models/users.model');
const { v1 } = require('uuid');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign({ _id: searchUser._id }, process.env.SECURITY_TOKEN_KEY);
    res.header('authorization', token).send('Log in!');

}

const movies = (req, res) => {
    res.send('Recieved movies');

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
const { getConnection } = require('../db');
const User = require('../models/user.model');
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


module.exports = {
    userRegister,
    userLogin

}
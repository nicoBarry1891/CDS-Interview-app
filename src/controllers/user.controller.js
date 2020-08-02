const { getConnection } = require('../db');
const User = require('../models/user.model');
const { v1 } = require('uuid');
const { CreateToken } = require('../libs/AuthToken');
const Joi = require('joi');




const userRegister = async(req, res) => {

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(8).max(16).required()
    });
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation) {
        res.status(400).send(validation);
    } else {

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
            res.status(200).json({ msg: 'Successful Sign up' });

        } else {
            res.status(400).json({ error: 'Email alredy exists' });
        }
    }


}

const userLogin = async(req, res) => {
    const searchUser = await getConnection().get('users').find({ email: req.body.email }).value();
    if (!searchUser) return res.status(400).json({ error: 'Invalid email or password' });
    const validatePassword = await User.validateUserPassword(req.body.password, searchUser.password);
    if (!validatePassword) return res.status(400).json({ error: 'Invalid password' });
    const token = CreateToken(searchUser.id);
    res.header('authorization', token).json({ msg: 'Log in!' });


}

const userLogOut = (req, res) => {
    req.token;
}


module.exports = {
    userRegister,
    userLogin,
    userLogOut

}
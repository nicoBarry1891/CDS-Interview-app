const express = require('express');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../db');
const { search } = require('../app');



const CreateToken = (user) => {
    const token = jwt.sign({ _id: user }, process.env.SECURITY_TOKEN_KEY, {
        expiresIn: '10h'
    });
    return token;
};

const ValidateToken = async(req, res, next) => {
    const token = req.header('authorization');
    const list_tokens = await getConnection().get('blacklist_tokens').find({ id_token: token }).value();
    if (!token || list_tokens) return res.status(401).json({ msg: 'Access Denied' });
    const playload = jwt.verify(token, process.env.SECURITY_TOKEN_KEY);
    req.userLogged = playload._id
    req.token = token;
    next();
}



module.exports = {
    CreateToken,
    ValidateToken
};
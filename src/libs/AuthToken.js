const express = require('express');
const jwt = require('jsonwebtoken');


const CreateToken = (user) => {
    const token = jwt.sign({ _id: user }, process.env.SECURITY_TOKEN_KEY, {
        expiresIn: 60 // in seconds
    });
    return token;
};

const ValidateToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ msg: 'Access Denied' });
    const playload = jwt.verify(token, process.env.SECURITY_TOKEN_KEY);
    req.userLogged = playload._id
    req.token = token;
    next();

}

module.exports = {
    CreateToken,
    ValidateToken
};
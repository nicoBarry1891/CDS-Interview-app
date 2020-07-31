const express = require('express');
const jwt = require('jsonwebtoken');

const ValidateToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(400).json('You don`t have permisson');
    const playload = jwt.verify(token, process.env.SECURITY_TOKEN_KEY);
    req.userLogged = playload._id
    next();

}

module.exports = ValidateToken;
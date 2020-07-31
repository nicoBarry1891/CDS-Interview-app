const express = require('express');
const morgan = require('morgan');
const app = express();


//Init server
app.set('port', process.env.PORT);



//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/users.route'));


module.exports = app;
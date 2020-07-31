const express = require('express');
const morgan = require('morgan');
const app = express();


//settings

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api', require('./routes/users.route'));


module.exports = app;
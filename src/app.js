const express = require('express');
const morgan = require('morgan');
const app = express();



const swagger = require('swagger-ui-express');
const apiDoc = require('../api-document.json');


//Init server
app.set('port', process.env.PORT || 3000);



//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/users.route'));
app.use('/api/movies', require('./routes/movies.route'));
app.use('/api-docs', swagger.serve, swagger.setup(apiDoc));


module.exports = app;
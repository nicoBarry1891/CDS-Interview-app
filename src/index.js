const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const { connectDB } = require('./db');


connectDB();
app.listen(app.get('port'), () => {
    console.log(`Starting server on port ${app.get('port')}`);
});
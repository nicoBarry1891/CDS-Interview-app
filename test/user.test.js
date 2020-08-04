const request = require('supertest');
const app = require('../src/index');
const url = 'http://localhost:3000';


describe('USER', function() {

    //SIGN UP
    describe('Post Sign Up', function() {

        it('Ok - status 200', async function() {
            await request(url).post('/api/register')
                .send({
                    email: "denver20@gmail.com",
                    firstName: "Denver",
                    lastName: "Colorado",
                    password: "denverdenver"
                })
                .expect(200);
        });

        it('Exists email - status 400', async function() {
            await request(url).post('/api/register')
                .send({
                    email: "denver20@gmail.com",
                    firstName: "Denver",
                    lastName: "Colorado",
                    password: "denverdenver"
                })
                .expect(400);
        });

        it('Email requiered - status 400', async function() {
            await request(url).post('/api/register')
                .send({
                    firstName: "Denver",
                    lastName: "Colorado",
                    password: "password123"
                })
                .expect(400);
        });

        it('FirstName requiered - status 400', async function() {
            await request(url).post('/api/register')
                .send({
                    email: "denver1@gmail.com",
                    lastName: "Colorado",
                    password: "denverdenver"
                })
                .expect(400);
        });

        it('LastName requiered - status 400', async function() {
            await request(url).post('/api/register')
                .send({
                    email: "denver1@gmail.com",
                    firstName: "Denver",
                    password: "denverdenver"
                })
                .expect(400);
        });

        it('Password requiered - status 400', async function() {
            await request(url).post('/api/register')
                .send({
                    email: "denver1@gmail.com",
                    firstName: "Denver",
                    lastName: "Colorado"
                })
                .expect(400);
        });
    });


    //LOGIN
    describe('Post Login', function() {
        it('Ok - status 200', async function() {
            await request(url).post('/api/login')
                .send({
                    email: "denver20@gmail.com",
                    password: "denverdenver"
                })
                .expect(200);
        });

        it('Invalid email or password - status 400', async function() {
            await request(url).post('/api/login')
                .send({
                    email: "denv@gmail.com",
                    password: "denverdenver"
                })
                .expect(400);
        });



        it('Invalid password - status 400', async function() {
            await request(url).post('/api/login')
                .send({
                    email: "denv@gmail.com",
                    password: "denverdenver"
                })
                .expect(400);
        });
    });
});

/*************************************************************************MOVIES**********************************************/

describe('MOVIES', function() {
    describe('Token', function() {

        it('No Auth list movies- status 401', async function() {
            await request(url).get('/api/movies/list-movies')
                .set('authorization', '')
                .expect(401);
        });



        it('No Auth add movies- status 401', async function() {
            await request(url).get('/api/movies/list-movies')
                .set('authorization', '')
                .expect(401);
        });



        it('No Auth list favorite movies- status 401', async function() {
            await request(url).get('/api/movies/list-movies')
                .set('authorization', '')
                .expect(401);
        });



    });
});
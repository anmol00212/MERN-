const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const express = require ('express');
const app = express();


//DOTENV
 
dotenv.config({path: './config.env'});
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json()); //so to unerstand json format


// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;


//MongoDB connection in db/conn.js


//Middleware

const middleware = (req, res, next) =>{
console.log('hello from middleware');
next();
}


 
 
 



//Routes

app.get('/', (req, res) => {
    res.send(`HEllO home page app.js`); 
});
 
app.get('/about',middleware, (req, res) => {
    console.log('hello from aboutme')
    res.send(`hello about me page`);
});

app.get('/signin', (req, res) => {
    res.send(`hello login page`);
});

app.get('/contact', (req, res) => {
    res.send(`hello contact page`);
});

app.get('/signup', (req, res) => {
    res.send(`hello registration page`);
});

app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`);
}) 
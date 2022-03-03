const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const cookieparser = require('cookie-parser')
dotenv.config({path: './config.env' });
app.use(cors())
require('./db/conn');
// const User = require('./model/userSchema');
app.use(express.json());
app.use(cookieparser())
// we link the the router files to route 
app.use(require('./router/auth'));

const PORT = process.env.PORT; 



// Middleware







app.get('/home',  (req,res)=> {
    console.log('hello home');
    res.send('Hello home World from the server')
});
app.get('/register',  (req,res)=> {
    console.log('hello home');
    res.send('Hello register World from the server')
});
// app.get('/signin',  (req,res)=> {
//     console.log('hello home');
//     res.send('Hello login World from the server')
// });

app.listen(5001, () => {
    console.log(`server is running on ${PORT}`);
})


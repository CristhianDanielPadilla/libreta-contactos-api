const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: '*'
}));

require('./database/db');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

dotenv.config({ path : './env/.env'});

app.use('/', require('./routes/router'));

app.use(function (req,res, next) {
    if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();    
})

app.listen(3000, () => {
    console.log('Server Running')
})
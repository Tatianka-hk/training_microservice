const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Router = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8002;
app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

const bd = process.env.mongo;
mongoose
    .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connection to DB'))
    .catch((error) => console.log(error)); //"no connection to DB"

app.get('/', (req, res, next) => {
    res.send('Todo es bueno');
});

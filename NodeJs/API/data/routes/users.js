const express = require('express');
const app = express();
const Route = express.Router();
const DB = require('../database/db');


app.use(express.json());

Route.post('/', (request, response, ) => {
    DB.query(

    )
});


module.exports = Route;
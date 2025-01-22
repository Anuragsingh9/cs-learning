const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');

app.use(cors());

app.use('/api',authRoutes);


const port = process.env.PORT || 8000;
app.listen(port,function(){
    console.log('App is running on port 8000');
});
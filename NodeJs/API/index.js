const express = require('express');
const app = express();

app.use(express.json());
const usersRoutes = require('./data/routes/users');
app.use('/', usersRoutes);
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log('Server is listening on 5000');
});

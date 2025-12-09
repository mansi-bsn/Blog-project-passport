const express = require('express');
const ejs = require('ejs');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const db = require('./db/db.connection');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

db();

app.use('/', routes);
app.use('/addBlog', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
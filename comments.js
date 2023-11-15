// Create web server application that will render comments page.

// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Require controllers
const users = require('./controllers/users');
const comments = require('./controllers/comments');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');

// Create web server application
const app = express();

// Configure application
app.set('view engine', 'pug');

// Use middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Configure routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/register', users.register);
app.post('/register', users.registerProcess);
app.get('/login', users.login);
app.post('/login', users.loginProcess);
app.get('/logout', users.logout);
app.get('/comments', comments.comments);
app.post('/comments', comments.commentsProcess);

// Start the web server
app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});
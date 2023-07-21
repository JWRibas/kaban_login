const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails.js');
const routes = require('./routes/router');

require('dotenv').config();


//app.use(express.static('public'));

app.use(express.static('assets'));




// Set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// Set up session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(routes);

// Set up Express server
const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

//UserDetails.register({ username: 'Mel', active: false }, '323130');
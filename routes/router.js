const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');



// GET Routes
router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('index', { title: 'Home' });
});


router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/index', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile('index.html', { root: './public' });
});





router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      // handle error
    } else {
      res.redirect('/');
    }
  });
});


// POST Routes
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/index',
  }),
  (req, res) => {
    console.log(req.user);
  }
);


module.exports = router;
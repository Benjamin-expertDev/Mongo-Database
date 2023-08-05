const express = require('express');
const router = express.Router();
const passport = require('passport');

const Admin = require('../models/admin');


router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin/login',
  failureFlash: true
}));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});


router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin/login');
}

module.exports = router;

const express = require('express')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

require("dotenv").config();

const router = express.Router()

const User = mongoose.model('users');


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use( new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({ googleId: profile.id })
             
            if (existingUser) {
                 //id already existing
                console.log("existing user")
;               done(null, existingUser);
             } else {
                const user = await new User({googleId: profile.id}).save()
                done(null, user);
             }

}
));

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}));

router.get('/google/callback', 
  passport.authenticate('google'/*, { failureRedirect: '/error' } */),
  function(req, res) {
    // Successful authentication, redirect success.
    console.log("succesful callback")
    res.redirect('/success');
  });

router.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
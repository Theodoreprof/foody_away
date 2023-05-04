const express = require('express')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

require("dotenv").config();

const router = express.Router()

const User = mongoose.model('users');

passport.use( new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                //id already existing
                done(null, existingUser);
            } else {
                new User({googleId: profile.id}).save()
                    .then(User => done(null, User));
            }
        })
        
}
));

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}, {session: false}));

router.get('/google/callback', passport.authenticate('google'));

module.exports = router;
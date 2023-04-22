const express = require('express')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config();

const router = express.Router()

passport.use( new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: 'auth/google/callback',
}, (accessTOken) => {
    console.log(accessTOken);
}
));

router.get('/', passport.authenticate('google'));

module.exports = router;
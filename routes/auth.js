const express = require('express')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Keys = require('./config/keys');

const router = express.Router()

passport.use( new GoogleStrategy({
    clientID: Keys.googleClientID,
    clientSecret: Keys.googleClientSecret,
    callbackURL: 'auth/google/callback',
}, (accessTOken) => {
    console.log(accessTOken);
}
));

router.get('/', passport.authenticate('google', {
    scope: [profile, email]
}));

module.exports = router;
const express = require('express')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const kes = require('./config/keys');

const router = express.Router()

passport.use( new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'auth/google/callback',
}, (accessTOken) => {
    console.log(accessTOken);
}
));

router.get('/', (req, res) => {
    res.send({hi : 'google'});
});

module.exports = router;
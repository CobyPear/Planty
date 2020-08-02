const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').GoogleStrategy;

passport.use(new GoogleStrategy());

module.exports = passport;
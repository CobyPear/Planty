// found at https://medium.com/swlh/set-up-an-express-js-app-with-passport-js-and-mongodb-for-password-authentication-6ea05d95335c
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //Match user
        User.findOne({ email: email })
            .then(user => {
                // create a new user if no match found
                if (!user) {
                    const newUser = new User({ email, password });
                    // hash password before sending it to databse
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err })
                                });
                        });
                    });
                    // return other user
                } else {
                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong Password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

//-----------------------------------------------------------------------------------
// google strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'api/auth/google/redirect',
        }, (accessToken, refreshToken, profile, done) => {
            // passport callback function
            //check if user already exists in our db with the given profile ID
            User.findOne({googleId: profile.id}).then((currentUser)=>{
                if(currentUser){
                  //if we already have a record with the given profile ID
                  done(null, currentUser);
                } else{
                     //if not, create a new user 
                    new User({
                      googleId: profile.id,
                    }).save().then((newUser) =>{
                      done(null, newUser);
                    });
                 } 
              })
        })
);

module.exports = passport;
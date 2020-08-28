// found at https://medium.com/swlh/set-up-an-express-js-app-with-passport-js-and-mongodb-for-password-authentication-6ea05d95335c
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

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

module.exports = passport;
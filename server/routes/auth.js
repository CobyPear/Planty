const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register_login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: 'No user found' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        })
    })(req, res, next);
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    res.send("you reached the redirect URI");
});

router.get('logout', (req, res) => {
    req.logout();
    res.send(req.user);
});


module.exports = router;
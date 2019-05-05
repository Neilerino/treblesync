const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../modules/user');

router.post('/register', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').isEmpty();
    req.checkBody('password2', 'Passwords must match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', 
        {
            errors: errors,
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            password: password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, salt) => {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return
                    } else {
                        req.flash('Registration Complete');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out'); 
});

module.exports = router;
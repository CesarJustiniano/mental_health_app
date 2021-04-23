import User from '../modules/users/model.js';
import Bcrypt from 'bcrypt';
const localStrategy = require('passport-local').Strategy;

export default passport => {

    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false); //null is the error, false is the user (no error, no user)
                Bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user); //returning a user
                    } else {
                        return done(null, false); //no user
                    }
                });
            });

        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
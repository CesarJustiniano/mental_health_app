import User from '../modules/users/model.js';
import Doctor from '../modules/doctors/model.js';
import Bcrypt from 'bcrypt';
const localStrategy = require('passport-local').Strategy;

export default passport => {

    // Passport strategies for user authentication in the application. One for user/patient
    // and another one for the doctor/psychologist/counselor.

    passport.use( 'user-local',
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

    passport.use( 'doctor-local',
        new localStrategy((username, password, done) => {
            Doctor.findOne({ username: username }, (err, user) => {
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

    // Serializes the logged user or doctor.

    passport.serializeUser((user, cb) => {
        cb(null, { _id: user._id, role: user.role});
    });

    // Deserializes the logged user or doctor, returns the information of that current user.

    passport.deserializeUser((id, cb) => {
        if(id.role === 'user') {
            User.findOne({_id: id }, (err, user) => {
                cb(err, user);
            });
        } else if(id.role === 'doctor') {
            Doctor.findOne({_id: id }, (err, user) => {
                cb(err, user);
            });
        }
    });
};
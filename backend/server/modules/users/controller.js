import User from './model.js';
import Bcrypt from 'bcrypt';
import passport from 'passport';

export const createUser = async (req, res) => {

    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("Email Already Exists");
        if (!doc) {

            const { firstName, lastName, username, email, phoneNumber, physicalAddress, age, gender } = req.body;
            const saltPassword = await Bcrypt.genSalt(10)
            const securePassword = await Bcrypt.hash(req.body.password, saltPassword)

            const newUser = new User({
                firstName,
                lastName,
                username,
                email,
                password: securePassword,
                phoneNumber,
                physicalAddress,
                age,
                gender,
            })

            try {
                //await newUser.save();
                //res.redirect(`/login`);
                return res.status(201).json(await newUser.save());
            } catch {
                //res.redirect('/signup')
                return res.status(404).json({ error: true, message: 'Error with user'})
            }
        }
    });
}

export const loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user.username);
                //res.redirect('/')  redirect to home page
            });
        }
    })(req, res, next);
}

export const logoutUser = async (req, res) => {
    req.logout();
    res.send("You are logged out");
    //res.redirect('/login');
}

export const getUser = async (req, res) => {
    res.send(req.user);  // The req.user stores the entire user that has been authenticated inside of it.
}

export const getAllUsers = async (req, res) => {
    try {
        // return User.find({}).populate('post').exec((err, data) => {
        //     if (err) throw err;
        //     console.log(data);
        // })
        return res.status(200).json(await User.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }
}

export const updateUser = async (req, res) => {
    if (req.user){
        let user

        user = await User.findById(req.params.id);

        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.username = req.body.username
        user.phoneNumber = req.body.phoneNumber
        user.physicalAddress = req.body.physicalAddress
        user.age = req.body.age
        user.gender = req.body.gender
        user.myDoctor = req.body.myDoctor

        //await user.save();
        return res.status(200).json(await user.save());
        //res.redirect()  to some path

    } else {
        return res.status(404).json({ error: true, message: 'Error with updating user'});
    }
}
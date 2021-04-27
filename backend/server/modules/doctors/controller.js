import Doctor from './model.js';
import Bcrypt from 'bcrypt';
import passport from 'passport';
import User from "../users/model";

export const createDoctor = async (req, res) => {

    Doctor.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("Email Already Exists");
        if (!doc) {

            const { firstName, lastName, username, email, phoneNumber,  age, gender , myPatients} = req.body;
            const saltPassword = await Bcrypt.genSalt(10)
            const securePassword = await Bcrypt.hash(req.body.password, saltPassword)

            const newDoctor = new Doctor({
                firstName,
                lastName,
                username,
                email,
                password: securePassword,
                phoneNumber,
                age,
                gender,
                myPatients,


            })

            try {

                //res.redirect(`/login`);
                return res.status(201).json(await newDoctor.save());
            } catch {
                //res.redirect('/signup')
                return res.status(404).json({ error: true, message: 'Error with doctor'})
            }
        }
    });

}

export const loginDoctor = async (req, res, next) => {
    passport.authenticate('local', (err, doctor, info) => {
        if (err) throw err;
        if (!doctor) res.send("No Doctor Exists");
        else {
            req.logIn(doctor, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user.username);
                //res.redirect('/')  redirect to home page
            });
        }
    })(req, res, next);
}

export const logoutDoctor = async (req, res) => {
    req.logout();
    res.send("You are logged out");
    //res.redirect('/login');
}

export const getDoctor = async (req, res) => {
    res.send(req.user);  // The req.user stores the entire user that has been authenticated inside of it.
}

export const getAllDoctors = async (req, res) => {
    try {
        // return User.find({}).populate('post').exec((err, data) => {
        //     if (err) throw err;
        //     console.log(data);
        // })
        return res.status(200).json(await Doctor.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Doctor'});
    }
}

export const getMyPatients = async (req, res) => {
    try {
        const doc = await Doctor.findOne({username:req.user.username})
        return res.status(200).json(await User.find({myDoctor:doc}))
        //return res.status(200).json(await Doctor.find().select({ myPatients: 1 }));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Doctor'});
    }
}

export const updateDoctor = async (req, res) => {
    if (req.user){
        let user

        user = await Doctor.findById(req.params.id);

        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.username = req.body.username
        user.phoneNumber = req.body.phoneNumber
        user.age = req.body.age
        user.gender = req.body.gender
        user.myPatients = req.body.myPatients

        //await user.save();
        return res.status(200).json(await user.save());
        //res.redirect()  to some path

    } else {
        return res.status(404).json({ error: true, message: 'Error with updating doctor'});
    }
}


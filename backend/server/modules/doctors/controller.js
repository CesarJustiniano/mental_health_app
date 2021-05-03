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
    passport.authenticate('doctor-local', (err, doctor, info) => {
        if (err) throw err;
        if (!doctor) res.send("No Doctor Exists");
        else {
            req.logIn(doctor, (err) => {
                if (err) throw err;
                doctor.isAuthenticated = true;
                //res.send("Successfully Authenticated");
                console.log(req.user.username);
                res.send(req.user);
                //res.redirect('/')  //redirect to home page
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
        return res.status(200).json(await Doctor.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Doctor'});
    }
}

export const getMyPatients = async (req, res) => {
    if(req.user.role === 'doctor') {

        const doctor = await Doctor.findById(req.user._id);

        try {
            //const doc = await Doctor.findOne({username: req.user.username})
            return res.status(200).json(await User.find({ myDoctor: doctor}));
            //return res.status(200).json(await Doctor.find().select({ myPatients: 1 }));
        } catch {
            return res.status(404).json({error: true, message: 'Error with Doctor'});
        }
    }
    else {
        return res.status(404).json({error: true, message: 'Error with Doctor'});
    }
}

export const getFirstName = async (req,res)=>{
    try {
        return res.status(200).json(await Doctor.findOne({_id: req.params.id},{firstName:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}
export const getLastName = async (req,res)=>{
    try {
        return res.status(200).json(await Doctor.findOne({_id: req.params.id},{lastName:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}

export const getPhoneNumber = async (req,res)=>{
    try {
        return res.status(200).json(await Doctor.findOne({_id: req.params.id},{phoneNumber:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}

export const updateDoctor = async (req, res) => {
    if (req.user){

        await Doctor.findOne({_id: req.user._id}, (err, obj) => {
            if(err) {
                console.log(err);
                res.status(500).send();
            } else {
                if(!obj) {
                    res.status(400).send();
                } else {
                    if(req.body.username) {
                        obj.username = req.body.username;
                    }

                    if(req.body.phoneNumber) {
                        obj.phoneNumber = req.body.phoneNumber;
                    }
                    //new
                    if(req.body.myAppointment){
                        obj.myAppointment.push(req.body.myAppointment)
                    }




                    obj.save((err, updatedObj) => {
                        if(err) {
                            console.log(err);
                            res.status(500).send();
                        } else {
                            res.send(updatedObj);
                        }
                    })
                }
            }
        })
    } else {
        return res.status(404).json({ error: true, message: 'Error with updating doctor'});
    }
}


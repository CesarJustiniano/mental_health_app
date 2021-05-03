import User from './model.js';
import Bcrypt from 'bcrypt';
import passport from 'passport';
import Doctor from '../doctors/model.js';

export const createUser = async (req, res) => {

    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("Email Already Exists");
        if (!doc) {

            const { firstName, lastName, username, email, phoneNumber, physicalAddress, age, gender, myDoctor } = req.body;
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
                role: 'user'
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
    passport.authenticate('user-local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                user.isAuthenticated = true;
                //res.send("Successfully Authenticated");
                console.log(req.user.username);
                res.send(req.user);
                //res.redirect('/')  //redirect to home page
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
        return res.status(200).json(await User.find({} ));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }
}



export const getAllEmails = async (req, res) => {
    try {
        return res.status(200).json(await User.find().select({ email: 1 }));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }
}

export const getMyEmail = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{email:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }
}

export const getFirstName = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{firstName:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}
export const getLastName = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{lastName:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}

export const getPhoneNumber = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{phoneNumber:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}

export const getAddress = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{physicalAddress:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}

export const getAppointment = async (req,res)=>{
    try {
        return res.status(200).json(await User.findOne({_id: req.params.id},{myAppointment:1}));

    } catch {
        return res.status(404).json({ error: true, message: 'Error with User'});
    }

}


export const updateUser = async (req, res) => {
    if (req.user){

        await User.findOne({_id: req.user._id}, (err, obj) => {
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

                    if(req.body.physicalAddress) {
                        obj.physicalAddress = req.body.physicalAddress;
                    }
                    //added for scheduler
                    if(req.body.myAppointment) {
                        obj.myAppointment = req.body.myAppointment;
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
        return res.status(404).json({ error: true, message: 'Error with updating user'});
    }
}

export const assignDoctor = async (req, res) => {
    if(req.user){

        const doctorId = await Doctor.findById(req.params.id);
        const userId = await User.findById(req.user._id);

        if(req.user.role === 'user'){
            await User.findOne({_id: userId}, (err, obj) => {
                if(err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    if(!obj){
                        res.status(400).send();
                    } else {
                        obj.myDoctor = doctorId;

                        obj.save((err, updatedField) => {
                            if(err) {
                                console.log(err);
                                res.status(500).send();
                            } else {
                                res.send(updatedField);
                            }
                        })
                    }
                }
            })

            await Doctor.findOne({_id: req.params.id}, (err, obj) => {//doctorId
                if(err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    if(!obj){
                        res.status(400).send();
                    } else {
                        obj.myPatients.push(userId);
                        obj.save();
                    }
                }
            })

        } else {
            return res.status(404).json({error: true, message: 'Error, not a user'});
        }

    } else {
        return res.status(404).json({error: true, message: 'Error assigning a doctor'});
    }
}
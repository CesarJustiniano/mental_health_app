import { Router } from 'express';
import User from '../users/model.js';
import Post from "../posts/model";
import Schedule from "../scheduler/model.js";
import Doctor from "../doctors/model";

const routes = new Router();

routes.post('/createSchedule', async (req, res) => {
    if(req.user) {

        if(req.user.role === 'user') {

            const user = await User.findOne({username: req.user.username}, function (err, userInfo){
                if (err) throw err;
                else
                    return userInfo;
            });


                //const {body} = req.body;
                const newAppointment = new Schedule({
                    appointment: req.body.appointment,
                    requestedBy: user,
                    yourDoctor: req.user.myDoctor
                });

                return res.status(200).json(await newAppointment.save());


        } else if (req.user.role === 'doctor') {

            const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
                if (err) throw err;
                else
                    return doctorInfo;
            });



                //const {body} = req.body;
                const newAppointment = new Schedule({
                    //body,
                    //postedBy: doctor,
                    //yourDoctor: req.user
                });

                return res.status(200).json(await newAppointment.save());

        }
    } else {
        return res.status(404).json({ error: true, message: 'Error with Schedule'});
    }
});


routes.get('/appointment', async (req, res) => {
    try {
        return res.status(200).json(await Schedule.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});



export default routes;

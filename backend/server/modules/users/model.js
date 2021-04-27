import mongoose, { Schema } from "mongoose";
import Doctor from '../doctors/model.js';
import Schedule from '../scheduler/model.js';



const UserSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [ true, "Can't be blank" ]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [ true, "Can't be blank" ]
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    physicalAddress: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },


    myDoctor: {
        type: mongoose.Schema.Types.Mixed,
        ref:'Doctor'

    },

    myAppointment:{
        type:mongoose.Schema.Types.Mixed,
        ref:'Schedule'
    }

}, { timestamps: {createdAt: true, updatedAt: false} });

export default mongoose.model('User', UserSchema);
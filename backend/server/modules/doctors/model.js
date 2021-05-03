import mongoose, { Schema } from "mongoose";


const DoctorSchema = new Schema ({
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
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    role: {
        type: String,
        default: 'doctor',
    },
    myPatients: [{
        type: mongoose.Schema.Types.Mixed,
    }],

    myAppointment:[{
        type:mongoose.Schema.Types.Mixed,
        ref:'Schedule'

    }],

}, { timestamps: {createdAt: true, updatedAt: false} });

export default mongoose.model('Doctor', DoctorSchema);
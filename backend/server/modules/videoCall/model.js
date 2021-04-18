import mongoose, {Schema} from "mongoose";

const VideoCallSchema = new Schema({
    body: {
        type: String,
        required: true,
        minlength: [10, '10 characters long at least'],
        maxlength: 150,
    },


    patient: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    doctor:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },

    appointmentDate:{
        type: Date
    }

}, { timestamps: {createdAt: true, updatedAt: false} } );

export default mongoose.model('VideoCall', VideoCallSchema);
import mongoose, {Schema} from "mongoose";
import User from '../users/model.js';
import Doctor from '../doctors/model.js';

const SchedulerSchema = new Schema({

        appointment:{
            type:Date,
            required: true,
        },

        requestedBy:{
            type: mongoose.Schema.Types.Mixed,
            ref: 'User'
        },

        yourDoctor:{
            type: mongoose.Schema.Types.Mixed,
            ref: 'Doctor'
}

})

export default mongoose.model('Schedule', SchedulerSchema)
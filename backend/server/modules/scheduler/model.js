import mongoose, {Schema} from "mongoose";
import User from '../users/model.js';

const SchedulerSchema = new Schema({

        appointment:{
            type:Date,
            required: true,


        },

        requestedBy:{
            type: mongoose.Schema.Types.Mixed
        },

        yourDoctor:{
            type: mongoose.Schema.Types.ObjectId
}

})

export default mongoose.model('Schedule', SchedulerSchema)
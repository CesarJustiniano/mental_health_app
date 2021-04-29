import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    chatRoom: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'ChatRoom',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Doctor'
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: false} });

export default mongoose.model('Message', messageSchema);
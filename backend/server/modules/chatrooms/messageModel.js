import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    chatroom: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'ChatRoom',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: false} });

export default mongoose.model('Message', messageSchema);
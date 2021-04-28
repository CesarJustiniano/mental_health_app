import mongoose, { Schema } from "mongoose";

const chatRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'User'
    }],
    doctor: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Doctor',
        required: true
    },
    messages: [{
       type: mongoose.Schema.Types.Mixed,
       ref: 'Message'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Message'
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

export default mongoose.model('ChatRoom', chatRoomSchema);
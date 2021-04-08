import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    text : {
        type: String,
        required: true,
        maxlength: 150,
    },
    postIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    postedBy: {
        type: mongoose.Schema.Types.Mixed,
    }
}, {timestamps: {createdAt: true, updatedAt: false} });

export default mongoose.model('Comment', CommentSchema);
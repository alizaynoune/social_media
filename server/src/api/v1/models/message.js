import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    deliveredBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

}, { timestamps: true });

MessageSchema.options.toJSON = {
    transform(doc, ret) {
        ret.id = ret._id.toString();
        ret.sender = ret.sender.toString();
        ret.conversation = ret.conversation.toString();
        delete ret._id;
        delete ret.__v;
    },
};

export default mongoose.model('Message', MessageSchema);

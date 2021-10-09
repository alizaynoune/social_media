import mongoose from 'mongoose'

const FrindSchema = new mongoose.Schema({
    frindIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});


export default mongoose.model('Frind', FrindSchema);

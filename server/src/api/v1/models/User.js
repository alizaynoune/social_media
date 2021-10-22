import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        max: 20,
        min: 3,
        required: [true, 'First name is required, Please provide it'],
        trim: true,
    },
    lastName: {
        type: String,
        max: 20,
        min: 3,
        required: [true, 'Last name is required, Please provide it'],
        trim: true,
        // unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required, Please provide it'],
        trim: true,
        index: true,
        unique: [true, 'Email already exists'],
        // match: []
    },
    gander: {
        type: String,
        enum: ['m', 'f', null],
        default: null,
        required: [true, 'Grander is required, Please provide it'],
    },
    birthday: {
        type: Date,
        trim: true,
        required: [true, 'Date of birth is required, Please provide it'],
        index: true,
    },
    phoneNumber: {
        type: Number,
        trim: true,
        default: null,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'superadmin'],
    },
    password: {
        type: String,
        required: true,
        min: 8,
        select: false,
    },
    avatar: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: null,
    },
    email_active: {
        type: Boolean,
        default: false,
    },
    is_deleted : {
        type: Boolean,
        default: false,
        select: true,
    }

}, { timestamps: true });



UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

UserSchema.methods.MatchPassword = async (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
};

UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        // console.log(options);
        ret.id = ret._id.toString();
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
    }
};




export default mongoose.model('User', UserSchema);

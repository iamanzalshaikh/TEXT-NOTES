import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: "",
    },
    dob: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

const newUser = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const loginUser = mongoose.models.loginUser || mongoose.model('loginUser', newUser);

export default loginUser;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be black']
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password cannot be black']
    },
})

module.exports = mongoose.model('User', userSchema);
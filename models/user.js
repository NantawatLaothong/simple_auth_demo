const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// add method to the model 
userSchema.statics.findAndValidate = async function(username, password) {
    // this refers to the model 
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.hashedPassword);
    // if isValid is true returns the user otherwise returns false
    return isValid ? foundUser : false;
}

// middlwares to schema,
// run this before .save() before we save we gonna hash the password using bcript
userSchema.pre('save', async function(next){
    // check if password has been modified 
    // if the password is not modified just skip the hashing part
    // if the password is modified, rehash the password and update it 
    if(!this.isModified('hashedPassword')){
        return next()
    }
    const salt = await bcrypt.genSalt(12);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
})

module.exports = mongoose.model('User', userSchema);
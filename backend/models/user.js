const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if((value - 18) < 0) {
                throw new Error('User must be over 18');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) throw new Error('Password cannot contain the word "password"');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// Virtual propery
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});


// Generate login token - available on the instance
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const keyPath = path.join(__dirname, '../private_key/key.txt');
    const private_key = fs.readFileSync(keyPath, 'utf8');

    const token = jwt.sign({_id: user._id.toString()}, private_key);
    user.tokens = user.tokens.concat({token});
    
    await user.save();

    return token;
}


// Middleware - hash password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    };

    next();

});

// Choose what we send
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


// Log in user/statics - available on User model
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({ email });

    if(!user) throw new Error('Unable to login');

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched) throw new Error('Unable to login');

    return user;
}

// Middleware - delete task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;

    await Task.deleteMany({ owner: user._id })

    next();
});


// User model
const User = mongoose.model('User', userSchema);


module.exports = User;
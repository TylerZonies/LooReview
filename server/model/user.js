var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
    },
    email: {
        type: String,
        // unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: 'Password is required',
        validate: [
            (input) => {
                return input.length >= 6;
            },
            'Password is must be greater than 6 characters'
        ]
    },
    gender: {
        type: String,
        required: 'Gender is required'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    reviewScore: {
        type: Number
    }
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
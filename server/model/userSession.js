var mongoose = require('mongoose');

var UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        defualt: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },
    // isModerator: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
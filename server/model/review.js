var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    comment: String,
    isAccessable: {
        type: Boolean,
        default: false
    },
    hasTampons: {
        type: Boolean,
        default: false
    },
    hasMirror: {
        type: Boolean,
        default: false
    },
    hasChangingStation: {
        type: Boolean,
        default: false
    },
    styleRate: {
        type: Number,
        min: 0,
        max:5,
        default: 0    
    },
    cleanRate:{
        type: Number,
        min: 0,
        max:5,
        default: 0
    },
    restId: {
        type: String
    },
    userInfo: {
        username: {
            type: String
        },
        userId: {
            type: String
        }
    },
    created: {
        type: Date,
        default: Date.now()
    },
    reviewScore: {
        upVotes: {
            type: Number
        },
        downVotes: {
            type: Number
        }
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
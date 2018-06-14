var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        default: ''
    },
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
    hasGloryhole: {
        type: Boolean,
        default: false
    },
    styleRate: {
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    cleanRate:{
        type: Number,
        min: 0,
        max:5,
        default: 5
    },
    restId: {
        type: String
    },
    userInfo: {
        username: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    created: {
        type: Date,
        default: Date.now()
    },
    reviewScore: {
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
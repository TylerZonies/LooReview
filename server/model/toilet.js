const mongoose = require('mongoose');

let ToiletSchema = new mongoose.Schema({
    geoData: {
        location: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        },
        name: {
            type: String
        }
    },
    placeId: {
        type: String,
        required: true
    },
    averageScore: {
        type: Number,
        min: 0,
        max: 5
    },
    averageCleanScore: {
        type: Number,
        min: 0,
        max: 5
    },
    averageStyleScore: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [ReviewSchema]
})
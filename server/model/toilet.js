const mongoose = require('mongoose');


let ToiletSchema = new mongoose.Schema({
    // geoData: {
    //     location: {
    //         lat: {
    //             type: Number
    //         },
    //         lng: {
    //             type: Number
    //         }
    //     },
    //     name: {
    //         type: String
    //     }
    // },
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
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

ToiletSchema.methods.rateAverage = function(rates){
    let total = 0;
    for(let i = 0; i < rates.length; i++){
        total += rates[i];
    }
    return total / rates.length;
}

module.exports = mongoose.model('Toilet', ToiletSchema);
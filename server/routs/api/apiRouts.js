const Model = require('../../model');

module.exports = (app) => {
    app.get('api/toilet', (req, res) => {
        const { query } = req;

        const {
            minrate,
            name,
            location,
            reviewby
        } = query;

        let monQuery = {}
        if(reviewby){
            monQuery = { 'reviews': { _id: reviewby} };
        }

        if(minrate){
            monQuery.averageScore = {$gt : minrate};
        }
        if(name){
            monQuery.geoData.name = name;
        }
        if(location){
            location = location.split(',');
            monQuery.geoData.location.lat = parseFloat(location[0]);
            monQuery.geoData.location.lng = parseFloat(location[2]);
        }

        Model.Toilet.find(monQuery).populate().then((req, res) => {
            const { body } = req;
            if(body.length < 1){
                res.json({
                    success: false,
                    message: 'Invalid_Query'
                })
            }

            res.json(body)
        })
        
    });

    app.get('/api/review', (req, res) => {
        const { query } = req;

        const {
            minrate,
            name,
            location,
            author
        } = query;

        let monQuery = {}
        if(author){
            monQuery.userInfo.username = author;
        }

        if(minrate){
            monQuery.minRate = minrate;
        }
        if(name){
            monQuery.location.name = name;
        }
        if(location){
            location = location.split(',');
            monQuery.location.lat = parseFloat(location[0]);
            monQuery.location.lng = parseFloat(location[2]);
        }
    })
}
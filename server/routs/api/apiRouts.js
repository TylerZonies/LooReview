const Model = require('../../model');
const request = require('request');

function rateAverage(rates){
    
}

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

        Model.Review.find(monQuery, (req, res) => {
            const { body } = req;
            if(body.length < 1){
                res.json({
                    success: false,
                    message: 'Invalid_Query'
                })
            }

            res.json(body);
        })
    });

    app.post('/api/review', (req, res) => {
        const { body } = req;

        console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");
        
        

        
        
        

        const { 
            userId,
            username,
            comment,
            isAccessable,
            hasTampons,
            hasMirror,
            hasChangingStation,
            hasGloryhole,
            styleRate,
            cleanRate,
            restId
        } = body;

        let tempObj = {
            comment: comment,
            isAccessable: isAccessable,
            hasTampons: hasTampons,
            hasMirror: hasMirror,
            hasChangingStation: hasChangingStation,
            styleRate: styleRate,
            cleanRate: cleanRate,
            restId: restId,
            userInfo: {
                username: username,
                userId: userId
            }
        }
        console.log(JSON.stringify(tempObj));
        console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");

        

        Model.Review.create(tempObj, (e, data) => {
            if(e) throw e;

            console.log('in create ' + data.restId + ' in document ' + Model.Toilet);
            Model.Toilet.find({placeId: data.restId}, (e, response) => {
                if (e) throw e;

                console.log(e + '\n\n');
                console.log('in toilet find ' + JSON.stringify(response));
                if(response.length == 0){
                    console.log('here');
                    const newToilet = new Model.Toilet();
                    newToilet.placeId = data.restId;
                    newToilet.averageScore = newToilet.rateAverage([data.cleanRate, data.styleRate]);
                    newToilet.reviews.push(data._id);

                    newToilet.save((e, user) => {
                        if(e) throw e;

                        res.status(200).json(data);
                    })
                }else{
                    res.status(500).json(response);
                }
            })
        })
    })
}
var request = require('request');
var key = require('../../keys');
const Model = require('../model');



module.exports = function(app){
    app.get('/search/location', (req, res) => {
        // grab query parameters from request
        const { query } = req;
        // pull input parameter mostly doing this for future updates
        const { 
            input
        } = query;
        // const {
        //     isAccessable,
        //     hasGloryhole,
        //     hasChangingStation,
        //     hasTampons,
        //     hasMirror,
        //     minRate
        // }

        // 
        let queryString = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + key.GOOGLE;

        queryString += "&address=" + input;
        


        request.get(queryString, (e, response, body) => {
            if(e) throw e;

            if(response.statusCode == 200){
                let { 
                    geometry
                } = JSON.parse(body).results[0];
                let { location } = geometry;
                let resObj = {
                    startPoint: location,
                    markers: []
                }


                console.log(location);

                let queryLocation = "";

                queryLocation += location.lat;
                queryLocation += "," + location.lng;

                secondQueryString = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + key.GOOGLE + '&location=' + queryLocation + '&rankby=distance&type=restaurant';

                request.get(secondQueryString, (e, response, body) => {
                    if(e) throw e;

                    if(res.statusCode == 200){
                        const { results } = JSON.parse(body);
                        
                        

                        // maybe recusively look for reviews with restaurant id
                         for(let i = 0; i< results.length;i++){    
                            let {
                                geometry,
                                name,
                                vicinity,
                                id
                            } = results[i]
                                
                            let tempObj = {
                                location: geometry.location,
                                name: name,
                                address: vicinity,
                                id: id
                            }

                            resObj.markers.push(tempObj);
                        }
                            

                        // Currently going to table the distance feature can get to that post project or maybe as a stretch
                        
                        
                        res.json(resObj);
                    }
                })
                
            } 
        });

        

        
    })
}
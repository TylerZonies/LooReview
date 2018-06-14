// requiring all models under model object
var Model = require('../model');





module.exports = app => {
    // signup post request
    app.post('/account/signup', (req, res) => {
        // grabbing request information into the object body
        const { body } = req;
        // grabbing parts of body needed
        const {
            username,
            password,
            gender
        } = body;
        let {
            email
        } = body;
        
        // Making sure that the inputs are not empty
        if(!username){
            res.json({
                success: false,
                message:'Error: Username cannot be blank.'
            });
            return
        }
        if(!email){
            res.json({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
            return
        }
        if(!password || password.length <= 6){
             res.json({
                success: false,
                message: 'Error: Password must be more than 6 characters'
            });
            return
        }
        if(!gender){
             res.json({
                success: false,
                message: 'Error: Gender cannot be blank.'
            });
            return
        }

        // set email to all lower case for better storage
        email = email.toLowerCase();

        // Checking database to make sure that no account exists useing the email or username that was input
        Model.User.find({email: email}, (err, data) => {
            if(err){
                // catch server error
                res.json({
                    success: false,
                    message: 'Error: Server error'
                });
                return
            }else if(data.length > 0){
                // check if email exists
                res.json({
                    success: false,
                    message: 'Error: Account useing that email already exists.'
                });
                return
            }
            // add way to make sure username doesn't already exist
            // else if (data[0].username == username){
            //     res.json({
            //         success: false,
            //         message: 'Error: Account useing that username already exists.'
            //     });
            //     return
            // }

            // Create new user
            const newUser = new Model.User();

            newUser.username = username;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.gender = gender;
            
            // save new user to database
            newUser.save((e, user) => {
                if(e){
                    res.json({
                        success: false,
                        message: 'Error: Server error'
                    });
                    return
                }else{
                    res.status(200).json({
                        success: true,
                        message: 'Signed up.'
                    })
                }
            })

        })

    });

    app.post('/account/signin', (req, res) => {

        // grabbing request information into the object body
        const { body } = req;
        // getting parts of body needed
        const {
            password
        } = body;
        let {
            email
        } = body;

        // set email to lower case to compare to database
        email = email.toLowerCase();

        if(!email){
            res.json({
                success: false,
                message: 'Error: Please enter valid email.'
            });
            return
        }
        if(!password){
             res.json({
                success: false,
                message: 'Error: Please enter password.'
            });
            return
        }

        Model.User.find({email: email}, (err, data) => {
            if(err){
                res.json({
                    success: false,
                    message: 'Error: Server Error'
                })
                return
            }
            // make sure the user exists and only one instance exists
            else if(data.length != 1){
                res.json({
                    success: false,
                    message: 'Error: Invalid'
                })
                return
            }

            const user = data[0];
            // uses the method valid password to decrypt hashed password for autorization
            if(!user.validPassword(password)){
                res.json({
                    success: false,
                    message: 'Error: Invalid'
                })
                return
            }
            // Possibly want to check if a UserSession document already exists for this user and update
            // is deleted to true instead of making an entirely new document

            // Model.UserSession.find({
            //     userId: user._id,
            //     isDeleted: true
            // })

            // create new user session with the users document id as the userId 
            const newUserSession = new Model.UserSession();

            newUserSession.userId = user._id;
            newUserSession.isAdmin = user.isAdmin;
            newUserSession.isModerator = user.isModerator;
            newUserSession.save((err, log) => {
                if(err){
                    res.json({
                        success: false,
                        message: 'Error: Server Error'
                    })
                    return
                }
                res.status(200).json({
                    success: true,
                    message: user.username + " is successfully logged in",
                    // send the sessions id to be saved as a token on local storage for verification
                    token: log._id,
                    // send information on this users permissions
                    // isAdmin: user.isAdmin,
                    // isModerator: user.isModerator
                });
            })
        })
    });

    app.get('/account/verify', (req, res, next) => {
        
        const { query } = req;
        const { token } = query;
        // this is getting token from the query (/account/verify?token=53s1345knjk4303)

        // search database to check if user is logged in
        Model.UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, docs) => {
            if(err) {
                res.json({
                    success: false,
                    message: 'Error: Server Error'
                })
                return
            }
            if(docs.length != 1){
                res.json({
                    success: false,
                    message: 'Error: Invalid'
                })
                return
            }else{
                res.json({
                    success: true,
                    message: 'Is Signed in',
                    // sending permissions again incase they were updated
                    isAdmin: docs[0].isAdmin,
                    isModerator: docs[0].isModerator
                })
                return
            }

        })
    });

    app.get('/account/logout', (req, res) => {
        
        const { query } = req;
        const { token } = query;
        // this is getting token from the query (/account/verify?token=53s1345knjk4303)

        // searching UserSession documents in database for token and updating isDeleted to true
        Model.UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {$set: { isDeleted: true }}, null, (err, docs) => {
            if(err) {
                res.json({
                    success: false,
                    message: 'Error: Server Error'
                })
                return
            }else{
                res.json({
                    success: true,
                    message: 'Logged Out'
                })
                return
            }
        })

    });


}
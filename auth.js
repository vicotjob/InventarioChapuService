const express = require('express');
const router = express.Router();
var User = require('./models/User.js');
var jwt = require('jwt-simple');


router.route('/login')
.post(async(req, res) => {
    var loginData = req.body;

    var user = await User.findOne({ Email: loginData.Email});

    if(!user){
        return res.status(401).send({ message: 'Email or password is incorrect'});
    }

    if(user.pwd == loginData.pwd){
        createSendToken(res, user)
    }else{
        return res.status(401).send({ message: 'Email or password is incorrect'});
    }
});

router.route('/register')
.post((req, res) => {
    var userData = req.body;

    var user = new User(userData)
    
    user.save((err, newUser) => {
        if (err)
            return res.status(500).send({ message: 'Error saving user' })

        createSendToken(res, newUser)
    })
})

function createSendToken(res, user) {
    var payload = { sub: user._id };

    var token = jwt.encode(payload, '123');

    res.status(200).send({ token });
}

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        if(!req.header('authorization'))
            return res.status(401).send({ message: 'Unauthorized'});
        var token = req.header('authorization').split(' ')[1];
        var payload = jwt.decode(token, '123');

        if(!payload)
            return res.status(401).send({ message: 'Unauthorized'})
        
        req.userId = payload.sub;

        next();
    }
}


module.exports = auth;
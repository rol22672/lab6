'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secretKey = '4zWp2pbd';

exports.createToken = (user)=>{
    var payload = {
        sub: user.id,
        name:user.name,
        lastname:user.lastname,
        email: user.email,
        iat: moment().unix,
        exp: moment().add(100,'years').unix()
    }
    return jwt.encode(payload,secretKey);
}
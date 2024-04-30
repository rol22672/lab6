'use strict'

var express = require("express");
var userController = require("../controllers/user.controller");
var api  = express.Router();




api.post("/login",userController.login);
api.post("/register",userController.register);




module.exports = api;

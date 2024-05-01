'use strict'

var express = require("express");


var postcontroller = require("../controllers/post.controller");


var api  = express.Router();
var mdAuth = require("../middlewares/auth.middleware");



api.get("/posts", postcontroller.getPosts);
api.get("/posts/:postId", postcontroller.getPostById);
api.post("/posts",[mdAuth.enshureAuth],postcontroller.savePost);
api.put("/posts/:postId",[mdAuth.enshureAuth], postcontroller.updatePost);
api.delete("/posts/:postId",[mdAuth.enshureAuth], postcontroller.deletePost);


module.exports = api;

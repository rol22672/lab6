'use strict'

var express = require("express");


var postcontroller = require("../controllers/post.controller");


var api  = express.Router();



api.get("/posts", postcontroller.getPosts);
api.get("/posts/:postId", postcontroller.getPostById);
api.post("/posts",postcontroller.savePost);
api.put("/posts/:postId", postcontroller.updatePost);
api.delete("/posts/:postId", postcontroller.deletePost);


module.exports = api;

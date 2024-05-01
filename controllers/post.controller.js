'use strict'

const pool = require ('../db/conn');

const fs = require('fs');
const path = require('path');

async function getPosts(req,res){

    try {
        const [rows] = await pool.query('SELECT * FROM post order by id DESC');    

        return res.send({message:"post encontrados: ",post: rows});
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({message:"error general",error});
    }
}


async function getPostById(req,res){
    let id = req.params.postId;

    try {
        const [rows] = await pool.query('SELECT * FROM post WHERE id='+id+'');    

        return res.send({message:"post encontrado: ", post: rows});
    } catch (error) {
        return res.status(500).send({message:"error general",error});
    }
}



async function savePost(req,res){
    let title = req.body.title;
    let content = req.body.content;
    let author  = req.body.author;
    let img64 = req.body.img;

    try {
        
        const [results] = await pool.query('INSERT INTO post (title, content, author, img) VALUES (?, ?, ?, ?)', [title, content,author, img64]);

        return res.send({message:"post guardado: ", post:results});
    } catch (error) {
        return res.status(500).send({message:"error general",error});
    }
}




async function updatePost(req,res){
    let title = req.body.title;
    let content = req.body.content;
    let author  = req.body.author;
    let id = req.params.postId;

    try {
        
        const [results] = await pool.query('UPDATE post SET title = ? , content = ? , author = ?  WHERE id = ?', [title, content,author, id]);

        return res.send({message:"post actualizado: ", post: results});
    } catch (error) {
        return res.status(500).send({message:"error general",error});
    }
}


async function deletePost(req,res){
    
    let id = req.params.postId;

    try {
        
        const [results] = await pool.query('DELETE FROM post WHERE id = ?', [id]);

        return res.status(200).send({message:"post eliminado: ", results});
    } catch (error) {
        return res.status(500).send({message:"error general",error});
    }
}



module.exports ={

    getPosts,
    getPostById,
    savePost,
    updatePost,
    deletePost

}
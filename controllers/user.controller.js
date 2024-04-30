'use strict'

const pool = require ('../db/conn');
var jwt = require("../services/jwt");




async function login(req,res){
    var params = req.body;

    if(params.username && params.password){

            const [rows] = await pool.query('SELECT * FROM user WHERE username='+username+'');

            if(rows.length==1){
                let userFind = rows[0];

                bcrypt.compare(params.password,userFind.password,(err,passwordCheck)=>{
                    if(err){                        
                        return res.status(500).send({message:"error general al comparar", err});
                    }else if(passwordCheck){
                        if(params.getToken){
                            return res.send({token:
                                                jwt.createToken(userFind),
                                                user: userFind,
                                                message:"Logueado exitosamente"
                                            });
                        }else{
                            return res.send({message:"usuario logueado, para obtener el token, ingrese el campo getToken"});
                        }
                    }else{
                        return res.send({message:"contraseña incorrecta", user:passwordCheck});        
                    }
                })
            }else{
                return res.status(400).send({message:"Usuario No encontrado"});
            }

            
    }else{
        return res.status(403).send({message:"Ingrese los campos mínimos"});
    }
}




async function register(req,res){
    var params = req.body;

    if(params.name && params.lastname && params.email && params.password){

        const [rows] = await pool.query('SELECT * FROM user WHERE username='+username+'');

        if(rows.length==1){
            let userFind = rows[0];
            return res.status(500).send({message:"El usuario ya se encuentra en uso"});
        }else{
            bcrypt.hash(params.password,null,null, async (err,passwordHash)=>{
                if(err){
                    return res.status(500).send({message:"Error general", err});
                }else if(passwordHash){
                    
                    try {
        
                        const [results] = await pool.query('INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)', [params.name, params.lastname,params.email, passwordHash]);
                        
                        return res.send({message:"user guardado ", results});
                    } catch (error) {
                        return res.status(500).send({message:"error general",error});
                    }

                }else{
                    return res.send({message:"no se pudo encriptar la contraseña"});
                }
            })
        }
    }else{
        return res.send({message:"Ingrese los campos mínimos"});
    }
}


module.exports ={
    login,
    register
}
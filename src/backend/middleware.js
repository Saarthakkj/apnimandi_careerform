const express = require('express');
const app = express();
const {jwtsecret} = require('./config.js');
const jwt = require('jsonwebtoken');
app.use(express.json());

const checkAuthHeader = (req , res , next)=>{
    const authHeader = req.headers['authorization'];
    if(!autheader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message : "Unauthorized"
        });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token , jwtsecret , (err , decoded) =>{
        if(err){
            return res.status(401).json({
                message : "Unauthorized"
            });
        }
        req.username = decoded.username;
        console.log("added this in req username : " , req.username);
        next();
    })

}

module.exports = checkAuthHeader;
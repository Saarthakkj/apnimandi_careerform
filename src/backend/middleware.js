import express from 'express'; // Import express
import { jwtsecret } from './config.js'; // Import jwtsecret
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const app = express();
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
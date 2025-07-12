const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validate= asyncHandler(async(req,res,next)=>{
    let token;
    // Get the Authorization header from the request (case-insensitive check).
    let authHeader =req.headers.authorization || req.headers.Authorization;
    // Check if the Authorization header exists and starts with 'Bearer'
    if(authHeader && authHeader.startsWith('Bearer')){
        token =authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                return res.status(401).json({
                    message: "Invalid or expired token",
                });
            }
            // If the token is valid, save the decoded data to req.user
            console.log("Decoded token data:", decoded);
            req.user = decoded;
        })
    }
    else {
        // No token provided
        return res.status(401).json({
            message: "Access token is missing or invalid",
        });}
    next(); 
})

module.exports = validate;
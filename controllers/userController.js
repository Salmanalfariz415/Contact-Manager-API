const asyncHandler = require("express-async-handler");
const pool = require('../config/database'); 
const registerUser = asyncHandler(async(req,res)=>{
    try{
        const [row] = await pool.query("INSERT INTO user_details (UserName,Email,Password) VALUES (?, ?, ?)",
        [req.body.Name, req.body.Email, req.body.Password]);
    res.json({
        message : "User registered successfully",
        data:[row]
    })
    }
    catch(err){
        res.status(500).json({
        message: "Error registering user",
        error: err.message
    });
    throw err;

    }

})

const loginUser = asyncHandler(async(req,res)=>{
    res.json({
        message : "User logged in successfully",
    })
})


const currentUser = asyncHandler(async(req,res)=>{
    res.json({
        message : "Current user data",
    })
})
module.exports={registerUser,loginUser,currentUser};
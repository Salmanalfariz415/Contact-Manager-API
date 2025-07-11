const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../config/database'); 
const registerUser = asyncHandler(async(req,res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM user_details");
        // Check if user already exists
        for(const row of rows){
            if(row.Email == req.body.Email){
                return res.status(400).json({
                    message: "Email already exists",
                });
            }
        }
        //so that no field is empty
        if(!req.body.Name || !req.body.Email || !req.body.Password){
            return res.status(400).json({
                message: "Please provide all required fields: Name, Email, Password",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.Password,10);
        
        const [row] = await pool.query("INSERT INTO user_details (UserName,Email,Password) VALUES (?, ?, ?)",
            [req.body.Name, req.body.Email, hashedPassword]);


        res.json({
            message : "User registered successfully",
            data:{
                UserName: req.body.Name,
                Email: req.body.Email, 
                ID : row.insertId // used in post,put,update
           }
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
    try{
        const [rows] = await pool.query("SELECT * FROM user_details WHERE Email = ? AND Password = ?",
        [req.body.Email, req.body.Password]);
    if(rows.length === 0){
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
        res.json({
        message : "User logged in successfully",
        data:{
            UserName: rows[0].UserName,
            Email: rows[0].Email,
            ID: rows[0].ID // used in post,put,update
        }
    })
    }
    catch(err){
        res.status(500).json({
            message: "Error logging in user",
            error: err.message
        });
        throw err;
    }
    
})


const currentUser = asyncHandler(async(req,res)=>{
    res.json({
        message : "Current user data",
    })
})
module.exports={registerUser,loginUser,currentUser};
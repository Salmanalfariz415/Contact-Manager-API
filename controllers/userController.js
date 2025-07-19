const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../config/database'); 
const registerUser = asyncHandler(async(req,res)=>{
    try{
        //desturturing the request body to make code cleaner
        const{ Name, Email, Password } = req.body;
        
        const [rows] = await pool.query("SELECT * FROM user_details");
        // Check if user already exists
        for(const row of rows){
            if(row.Email == Email){
                return res.status(400).json({
                    message: "Email already exists",
                });
            }
        }
        //so that no field is empty
        if(!Name || !Email || !Password){
            return res.status(400).json({
                message: "Please provide all required fields: Name, Email, Password",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password,10);
        
        const [row] = await pool.query("INSERT INTO user_details (UserName,Email,Password) VALUES (?, ?, ?)",
            [Name, Email, hashedPassword]);
 

        res.json({
            message : "User registered successfully",
            data:{
                UserName: Name,
                Email: Email, 
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
    const {Email,Password} = req.body;
    const [rows] = await pool.query("SELECT * FROM user_details WHERE Email = ?",[Email]);
    if(rows.length === 0){
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    const actualPassword = rows[0].Password;
    const isPasswordValid = await bcrypt.compare(Password,actualPassword);
    if(isPasswordValid === true){

        const token = jwt.sign({
        userName : rows[0].UserName,
        email : Email,
        id : rows[0].ID
        },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'2h',// Token will expire in 2 hours 
        });

        res.json({
        message : "User logged in successfully",
        token: token,
        data:{
            UserName: rows[0].UserName,
            Email: rows[0].Email,
            ID: rows[0].ID // used in post,put,update
        }
    })

    }
    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
        
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
   try{
     res.json({
        message : "Current user data",
        data: req.user 
    })
   }
   catch(err){
        res.status(500).json({
            message: "Error fetching current user data",
            error: err.message
        });
        throw err;
    }
})
module.exports={registerUser,loginUser,currentUser};
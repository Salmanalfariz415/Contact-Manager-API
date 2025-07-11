const pool = require('../config/database'); // Importing the database connection pool


//Here function is being exported

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const asyncHandler = require("express-async-handler");

const getAllContact = asyncHandler(async(req,res)=>{
    try{
        const [rows]=await pool.query("SELECT * FROM Contact_Details");
        res.json({
        message: "Get all contacts",
        data:rows
    });
    }
    catch(err){
        res.status(500).json({
            message:"Error fetching contacts",
            error:err.message
        })
        console.err("Database connection error:", err);
        throw err;
    }
})

//@desc Create new contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async(req,res)=>{
    try{
        const [result] = await pool.query("INSERT INTO Contact_Details (Name,Email,Number) VALUES (?, ?, ?)",
            //The ? placeholders work very much like %d, %s in C — they are parameter markers used in prepared statements.
        [req.body.Name, req.body.Email, req.body.Number]);
        res.json({
        message: "Create Contacts",
        data: {
            Name: req.body.Name,
            Email: req.body.Email,
            Number: req.body.Number,
            insertId: result.insertId  // used in post,put,update
        }
    });
    }
    catch(err){
        console.error("Database connection error:", err);
        res.status(500).json({ // every error (even if it's a 400, 401, or 404 issue) will incorrectly show as a 500 Internal Server Error.
            message: "Error creating contact",
            error: err.message
        });
        throw err;
    }
})

//@desc Get contact with id
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async(req,res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM Contact_Details WHERE ID = ?",[req.params.id]);
        res.json({
        message: `Get Contact with ID:  ${req.params.id} `,
        data:rows,
    });
    }
    catch(err){
        console.eroor("Database connection error:", err);
        res.status(500).json({
            message:"Error fetching contact",
            error:err.message
        })
        throw err;
    }
})


//@desc Create new contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async(req,res)=>{
    try{
        const [result]= await pool.query("UPDATE Contact_Details SET Name = ?,Email = ?,Number =? WHERE ID = ?",
            [req.body.Name,req.body.Email,req.body.Number,req.params.id]);
            res.json({
                message: `Updated Contact with ID:  ${req.params.id} `,
                data:
                {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Number: req.body.Number,
                    ID : req.params.id
                }
            })
            
    }
    catch(err){
        console.log("Database connection error:", err);
        res.status(500).json({
            message: "Error updating contact",
            error: err.message
        })
        throw err;
    }
})


//@desc Delete new contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async(req,res)=>{
    try{
        const [result]= await pool.query("DELETE FROM Contact_Details WHERE id = ?",req.params.id);
        res.json({
        message: `Deleted Contact with ID:  ${req.params.id} `
    });
    }
    catch(err){
        console.log("Database connection error:", err);
        res.status(500).json({
            message: "Error deleting contact",
            error: err.message
        })
        throw err;
    }
})

module.exports={getAllContact,getContact,createContact,updateContact,deleteContact};
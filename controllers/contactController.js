const pool = require('../config/database'); // Importing the database connection pool
const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContact = asyncHandler(async(req,res)=>{
    const [rows] = await pool.query("SELECT * FROM Contact_Details WHERE User_ID = ?", [req.user.id]);
    res.json({
        message: "Get all contacts",
        data: rows
    });
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req,res)=>{
    // Basic validation
    if (!req.body.Name || !req.body.Email || !req.body.Number) {
        return res.status(400).json({ 
            message: "Name, Email, and Number are required" 
        });
    }

    const [result] = await pool.query(
        "INSERT INTO Contact_Details (Name,Email,Number,User_ID) VALUES (?, ?, ?, ?)",
        [req.body.Name, req.body.Email, req.body.Number, req.user.id]
    );
    
    res.status(201).json({
        message: "Contact created successfully",
        data: {
            Name: req.body.Name,
            Email: req.body.Email,
            Number: req.body.Number,
            user_ID: req.user.id
        }
    });
});

//@desc Get contact with id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req,res)=>{
    const [rows] = await pool.query(
        "SELECT * FROM Contact_Details WHERE User_ID = ? AND ID = ?",
        [req.user.id, req.params.id]
    );
    
    if (rows.length === 0) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }
    
    res.json({
        message: `Get Contact with ID: ${req.params.id}`,
        data: rows[0]
    });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>{
    // Basic validation
    if (!req.body.Name || !req.body.Email || !req.body.Number) {
        return res.status(400).json({ 
            message: "Name, Email, and Number are required" 
        });
    }

    const [result] = await pool.query(
        "UPDATE Contact_Details SET Name = ?, Email = ?, Number = ? WHERE User_ID = ? AND ID = ?",
        [req.body.Name, req.body.Email, req.body.Number, req.user.id, req.params.id]
    );
    
    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }
    
    res.json({
        message: `Updated Contact with ID: ${req.params.id}`,
        data: {
            Name: req.body.Name,
            Email: req.body.Email,
            Number: req.body.Number,
            ID: req.params.id,
            User_ID: req.user.id
        }
    });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res)=>{
    const [result] = await pool.query(
        "DELETE FROM Contact_Details WHERE User_ID = ? AND ID = ?",
        [req.user.id, req.params.id]
    );
    
    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }
    
    res.json({
        message: `Deleted Contact with ID: ${req.params.id}`
    });
});

module.exports = {getAllContact, getContact, createContact, updateContact, deleteContact};
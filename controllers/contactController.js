//Here function is being exported

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const asyncHandler = require("express-async-handler");

const getAllContact = asyncHandler(async(req,res)=>{
    res.json({
        message: "Get all contacts"
    });
})

//@desc Create new contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async(req,res)=>{
    res.json({
        message: "Create Contacts"
    });
})

//@desc Get contact with id
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async(req,res)=>{
    res.json({
        message: `Get Contact with ID:  ${req.params.id} `
    });
})


//@desc Create new contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async(req,res)=>{
    res.json({
        message: `Update Contact with ID:  ${req.params.id} `
    });
})


//@desc Delete new contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async(req,res)=>{
    res.json({
        message: `Delete Contact with ID:  ${req.params.id} `
    });
})

module.exports={getAllContact,getContact,createContact,updateContact,deleteContact};
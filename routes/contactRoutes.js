let express=require('express');
let router=express.Router();
let validate=require('../middleware/validateTokenHandler');
router.use(validate); // Apply the validate middleware to all routes in this file


//function is being imported from the controller
const {getAllContact,getContact,createContact,updateContact,deleteContact}=require('../controllers/contactController');

router.get('/',getAllContact);

router.post('/',createContact);

router.get('/:id',getContact);

router.put('/:id',updateContact);

router.delete('/:id',deleteContact);


module.exports=router;
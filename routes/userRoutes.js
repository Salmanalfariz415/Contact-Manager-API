const express = require('express');
const router = express.Router();
const validate = require('../middleware/validateTokenHandler');

const {registerUser,loginUser,currentUser}= require('../controllers/userController');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/current',validate,currentUser);


module.exports = router;
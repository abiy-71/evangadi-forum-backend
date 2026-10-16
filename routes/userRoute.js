const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkUser } = require('../controller/userController');
const authenticateUser = require('../middleware/authMiddleware');

// register route
router.post("/register", registerUser);
 
// login route
router.post("/login", loginUser);

// check user route
router.get("/check",authenticateUser, checkUser);


module.exports = router;
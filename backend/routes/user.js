const express = require('express')
const router = express.Router()

//controller functions
const { signInUser, signUpUser, checkUser } = require('../controllers/userController')
 
//signin route
router.post("/signin", signInUser)

//signup route
router.post("/signup", signUpUser)

//check uniqueness route
router.post("/check", checkUser)


module.exports = router
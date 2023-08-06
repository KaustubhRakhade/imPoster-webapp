const User = require('../models/userModel')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})
}

//signin user
const signInUser = async (req, resp) => {

    const {email, password} = req.body


    try {
        const user = await User.signin(email, password)

        //the JWT token
        const token = createToken(user._id)

        resp.status(200).json({
            username: user.username,
            email: user.email,
            user_id: user._id,
            token
        })

    }
    catch (error) {
        resp.status(400).json({"error": error.message})
    }
}

//signup user
const signUpUser = async (req, resp) => {
    const {username, email, password} = req.body

    try {
        //use static function "signup" to get a new userModel
        const user = await User.signup(username, email, password)

        //the JWT token
        const token = createToken(user._id)

        //send back the newly generated user
        resp.status(200).json({
            username: user.username,
            user_id: user._id,
            email: user.email,
            token
        })

    }
    catch (error) {
        resp.status(400).json({"error": error.message})
    }
}

//check uniqueness
const checkUser = async (req, resp) => {
    const {username, email} = req.body

    try {
        const isDuplicate = await User.check(username, email)
        resp.status(200).json(isDuplicate)
    }
    catch (error) {
        resp.status(400).json({"error": error.message})
    }
}

module.exports = { signInUser, signUpUser, checkUser }
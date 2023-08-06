const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
//NOTE: DON'T USE ARROW FUNCTION
userSchema.statics.signup = async function (username, email, password) {

    //validation
    if (!username || !email || !password) {
        throw Error("All fields must be filled!")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid!")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password should be atleast 8 characters, atleast one UPPERCASE, one lowercase, one digit & one special character")
    }

    //check if email already exist
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error("Email already exists!")
    }

    //check if username is already taken
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error("Username already exists!")
    }

    //encrypting the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //initiate a new UserModel and save to DB
    const user = await this.create({
        username,
        email,
        password: hash
    })

    return user
}

//static signin method
userSchema.statics.signin = async function (email, password) {

    //validation
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect Email!")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect Password!")
    }

    return user
}

//check static method
userSchema.statics.check = async function (username, email) {

    // //validation
    // if (!username || !email) {
    //     throw Error("Invalid request!")
    // }

    const isDuplicate = {
        "email": false,
        "username": false
    }

    //check if email already exist
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        isDuplicate.email = true
    }

    //check if username is already taken
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        isDuplicate.username = true
    }

    return isDuplicate
}


module.exports = mongoose.model("User", userSchema)
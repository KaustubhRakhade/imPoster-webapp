const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, resp, next) => {
    //verify authentication
    const { authorization } = req.headers

    console.log(req.headers)
    if (!authorization) {
        return resp.status(400).json({
            "error": "No Auth Token Provided!"
        })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select(['_id', "username"])
        next()
    } 
    catch (error) {
        console.log(error)
        resp.status(400).json({
            error: "Authorization failed!"
        })
    }
}

module.exports = {
    requireAuth
}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: String,
        required: true
    }],
    dislikes: [{
        type: String,
        required: true
    }]
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)
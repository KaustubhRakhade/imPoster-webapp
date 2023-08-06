const postModel = require('../models/postModel')
const mongoose = require("mongoose")

//get all posts
const getAllPosts = async (req, resp) => {
    const posts = await postModel.find().sort({createdAt: -1})
    resp.status(200).json(posts)
}

//get a single post
const getPost = async (req, resp) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        resp.status(404).json({
            error: "Invalid ID!"
        })
        return 
    }

    const post = await postModel.findById(id)

    if (!post) {
        resp.status(404).json({
            error: "No such post found!"
        })
        return
    }

    resp.status(200).json(post)
}

//create a post
const createPost = async (req, resp) => {
    const {content, likes, dislikes} = req.body

    try {
        const post = await postModel.create({
            user_id: req.user._id,
            username: req.user.username,
            content,
            likes,
            dislikes
        })
        resp.status(200).json(post)
    }

    catch (error) {
        resp.status(400).json({"error": error.message})
    }
}

//edit a post
const editPost = async (req, resp) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        resp.status(404).json({
            error: "Invalid ID!"
        })
        return 
    }

    const post = await postModel.findById(id)

    if (!post) {
        resp.status(404).json({
            error: "No such post found!"
        })
        return
    }
    
    if (post.user_id != req.user._id) {
        resp.status(404).json({
            error: "Edit unauthorized!"
        })
        return 
    }

    const editedpost = await postModel.findByIdAndUpdate(id, { ...req.body })

    resp.status(200).json(editedpost)
}

//delete a post
const deletePost = async (req, resp) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        resp.status(404).json({
            error: "Invalid ID!"
        })
        return 
    }

    const post = await postModel.findById(id)

    if (!post) {
        resp.status(404).json({
            error: "No such post found!"
        })
        return
    }

    if (post.user_id != req.user._id) {
        resp.status(404).json({
            error: "Delete unauthorized!"
        })
        return 
    }

    const deletedpost = await postModel.findByIdAndDelete(id)

    resp.status(200).json(deletedpost)
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    editPost,
    deletePost
}
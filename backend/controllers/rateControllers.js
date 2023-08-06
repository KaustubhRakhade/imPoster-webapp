const postModel = require('../models/postModel')
const mongoose = require("mongoose")

//like a posts
const likePost = async (req, resp) => {
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
    
    if (post.likes.includes(req.user._id)) {

        const unlikedPost = await postModel.findByIdAndUpdate(id, {
            likes: post.likes.filter((u) => u != req.user._id)
        }, { new: true })
        resp.status(200).json(unlikedPost)
    }

    if (!post.likes.includes(req.user._id)) {

        const likedPost = await postModel.findByIdAndUpdate(id, {
            likes: [req.user._id, ...post.likes],
            dislikes: post.dislikes.filter((u) => u != req.user._id)
        }, { new: true })
        resp.status(200).json(likedPost)
    }

}

//dislike a posts
const dislikePost = async (req, resp) => {
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

    if (post.dislikes.includes(req.user._id)) {

        const undislikedPost = await postModel.findByIdAndUpdate(id, {
            dislikes: post.dislikes.filter((u) => u != req.user._id)
        }, { new: true })
        resp.status(200).json(undislikedPost)
    }

    if (!post.dislikes.includes(req.user._id)) {

        const dislikedPost = await postModel.findByIdAndUpdate(id, {
            dislikes: [req.user._id, ...post.dislikes],
            likes: post.likes.filter((u) => u != req.user._id)
        }, { new: true })
        resp.status(200).json(dislikedPost)
    }
}


module.exports = {
    likePost,
    dislikePost,
}
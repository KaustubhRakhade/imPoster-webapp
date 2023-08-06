const express = require('express')

const router = express.Router()
const {
    getAllPosts,
    getPost,
    createPost,
    editPost,
    deletePost
} = require("../controllers/postControllers")
const { requireAuth } = require("../middleware/requireAuth")

//middleware
// requires auth for all the routes
router.use(requireAuth)

//get all posts
router.get("/", getAllPosts)

//get single post
router.get("/:id", getPost)

//create a post
router.post("/", createPost)

//edit a post
router.patch("/:id", editPost)

//delete a post
router.delete("/:id", deletePost)


module.exports = router
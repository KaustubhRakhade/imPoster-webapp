const express = require('express')

const router = express.Router()
const {
    likePost,
    dislikePost,
} = require("../controllers/rateControllers")
const { requireAuth } = require("../middleware/requireAuth")

//middleware
// requires auth for all the routes
router.use(requireAuth)

//rate a posts
router.get("/like/:id", likePost)
router.get("/dislike/:id", dislikePost)

module.exports = router
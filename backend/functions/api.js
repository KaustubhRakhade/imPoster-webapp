require('dotenv').config()
const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http');

const app = express()
const mongoose = require("mongoose")
const postsRoutes = require('../routes/post')
const userRoutes = require('../routes/user')
const rateRoutes = require('../routes/rate')

//middleware
app.use(express.json())
app.use(cors());
app.use((req, resp, next) =>{
    console.log(req.method, req.path)
    next()
})

//route
app.use("/api/posts", postsRoutes)
app.use("/api/user", userRoutes)
app.use("/api/rate", rateRoutes)

//connect to db
//then start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen
        // app.listen(process.env.PORT, () => {
            console.log("MONGODB CONNECTED")
        // })  
    })
    .catch((error) => {
        console.log(error)
    })

module.exports.handler = serverless(app);

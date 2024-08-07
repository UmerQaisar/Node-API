const express = require("express");
const app = express.Router()

const userRoute = require("./user.routes");
const productRoute = require("./product.routes");
const postRoute = require("./post.routes");
const commentRoute = require("./comment.routes");

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/', (req, res) => res.json({message: 'Homepage'}))

module.exports = app

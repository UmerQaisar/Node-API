const express = require("express");
const app = express.Router()

const userRoute = require("./user.routes");
const productRoute = require("./product.routes");
const postRoute = require("./post.routes");
const commentRoute = require("./comment.routes");
const passport = require("passport");

function isAuthenticated(){
    return passport.authenticate('jwt', { session: false })
}

app.use('/api/users', isAuthenticated(), userRoute)
app.use('/api/products', isAuthenticated(), productRoute)
app.use('/api/posts', isAuthenticated(), postRoute)
app.use('/api/comments', isAuthenticated(), commentRoute)
app.use('/', (req, res) => res.json({message: 'Homepage'}))

module.exports = app

require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const productRoute = require('./routes/product.routes.js')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/products', productRoute)

//server
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to mongo server...")

        app.listen(port, () => {
            console.log('Express server is running on port 3000')
        })
    })
    .catch((e) => {
        console.log("Connection failed. " + e)
    })


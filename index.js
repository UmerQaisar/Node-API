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
mongoose.connect("mongodb+srv://umerqaisar786:od5Afg5fsj94ystf@nodeapi.jl6a4iy.mongodb.net/?retryWrites=true&w=majority&appName=NodeApi")
    .then(() => {
        console.log("Connected to mongo server...")

        app.listen(3000, () => {
            console.log('Express server is running on port 3000')
        })
    })
    .catch((e) => {
        console.log("Connection failed. " + e)
    })


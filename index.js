const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')

const app = express()
app.use(express.json())

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

app.get('/api/products', async (req, res) => {
    try {
        const response = await Product.find({})
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const response = await Product.create(req.body)
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

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

app.get('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).send('Product not found')
        }
        res.status(200).send(product)
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

app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(400).send('Product not found')
        }

        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(400).send('Product not found')
        }

        res.status(200).send('Product deleted successfully')
    } catch (e) {
        res.status(500).send(e.message)
    }
})


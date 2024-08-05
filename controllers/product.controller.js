const Product = require("../models/product.model");

const getProducts = async (req, res) => {
    try {
        const response = await Product.find({})
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const getProduct = async (req, res) => {
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
}

const createProduct = async (req, res) => {
    try {
        const response = await Product.create(req.body)
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const updateProduct = async (req, res) => {
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
}

const deleteProduct = async (req, res) => {
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
}

module.exports = {getProducts, getProduct, createProduct, updateProduct, deleteProduct}
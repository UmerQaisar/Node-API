import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a product name'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter a quantity'],
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
        default: 0,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

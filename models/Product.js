const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    // 🔥 THIS WAS MISSING (MAIN FIX)
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");

router.post("/", auth, async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        let cart = await Cart.findOne({ userId });

        // CREATE CART IF NOT EXISTS
        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        // CHECK IF PRODUCT ALREADY EXISTS
        const existingItem = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                productId,
                quantity: 1
            });
        }

        await cart.save();

        res.json({
            message: "Added to cart",
            cart
        });

    } catch (err) {
        console.log("CART ERROR:", err);
        res.status(500).json({
            message: "Server error while adding to cart"
        });
    }
});

module.exports = router;
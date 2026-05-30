const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const Cart = require("../models/Cart");

/* ================= ADD TO CART ================= */
router.post("/", auth, async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;

        console.log("USER:", userId);
        console.log("PRODUCT:", productId);

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        }

        cart.items.push({ productId, quantity: 1 });

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
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");

/* ================= ADD TO CART ================= */

router.post("/", auth, async (req, res) => {
    try {

        const userId =
            req.user.id ||
            req.user._id ||
            req.user.userId;

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(
            i => i.productId?.toString() === productId
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
        console.log("ADD CART ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= GET CART ================= */

router.get("/", auth, async (req, res) => {
    try {

        const userId =
            req.user.id ||
            req.user._id ||
            req.user.userId;

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            return res.json({ items: [] });
        }

        res.json({
            items: cart.items
        });

    } catch (err) {
        console.log("GET CART ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= UPDATE QUANTITY (+ / -) ================= */

router.put("/update/:productId", auth, async (req, res) => {
    try {

        const userId =
            req.user.id ||
            req.user._id ||
            req.user.userId;

        const { productId } = req.params;
        const { change } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity += change;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                i => i.productId.toString() !== productId
            );
        }

        await cart.save();

        res.json({
            message: "Cart updated",
            cart
        });

    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= REMOVE ITEM ================= */

router.delete("/remove/:productId", auth, async (req, res) => {
    try {

        const userId =
            req.user.id ||
            req.user._id ||
            req.user.userId;

        const { productId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );

        await cart.save();

        res.json({
            message: "Item removed",
            cart
        });

    } catch (err) {
        console.log("REMOVE ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET CART
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.json([]);
        }

        const cartItems = await Promise.all(
            cart.items.map(async (item) => {
                const product = await Product.findById(item.productId);

                if (!product) return null;

                return {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: item.quantity || 1
                };
            })
        );

        res.json(cartItems.filter(Boolean));

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load cart" });
    }
};

// ADD TO CART
exports.addToCart = async (req, res) => {
    try {

        const { productId } = req.body;

        let cart = await Cart.findOne({
            userId: req.user.id
        });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id,
                items: []
            });
        }

        const existingItem = cart.items.find(
            item => item.productId === productId
        );

        if (existingItem) {
            existingItem.quantity =
                (existingItem.quantity || 1) + 1;
        } else {
            cart.items.push({
                productId,
                quantity: 1
            });
        }

        await cart.save();

        res.json({
            success: true,
            message: "Added to cart"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to add to cart"
        });
    }
};

// UPDATE QUANTITY
exports.updateQuantity = async (req, res) => {
    try {

        const { productId } = req.params;
        const { change } = req.body;

        const cart = await Cart.findOne({
            userId: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.productId === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        item.quantity += change;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.productId !== productId
            );
        }

        await cart.save();

        res.json({
            success: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update quantity"
        });
    }
};

// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({
            userId: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.productId !== productId
        );

        await cart.save();

        res.json({
            success: true,
            message: "Item removed"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to remove item"
        });
    }
};
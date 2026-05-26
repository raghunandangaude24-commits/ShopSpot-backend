const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
        cart = await Cart.create({
            userId: req.user.id,
            items: []
        });
    }

    cart.items.push(req.body);
    await cart.save();

    res.json(cart);
};
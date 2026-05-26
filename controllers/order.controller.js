const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    const order = await Order.create({
        userId: req.user.id,
        items: req.body.items,
        total: req.body.total
    });

    res.json(order);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
};
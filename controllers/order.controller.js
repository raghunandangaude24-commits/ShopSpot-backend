const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;

        const { items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = new Order({
            userId: String(userId),
            items,
            totalAmount
        });

        await order.save();

        res.status(201).json(order);

    } catch (err) {
        console.error("CREATE ORDER ERROR:", err);
        res.status(500).json({ message: "Order creation failed" });
    }
};

// GET ORDERS
exports.getOrders = async (req, res) => {
    try {
        const userId = String(req.user._id || req.user.id);

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {
        console.error("GET ORDERS ERROR:", err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
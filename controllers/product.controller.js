const Product = require("../models/Product");

/* ================= GET ALL PRODUCTS ================= */
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json(products);

    } catch (err) {
        console.error("GET PRODUCTS ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= GET SINGLE PRODUCT ================= */
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (err) {
        console.error("GET SINGLE PRODUCT ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= ADD PRODUCT ================= */
exports.addProduct = async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({ message: "Name, price, image required" });
        }

        const product = await Product.create({
            name,
            price,
            image,
            description
        });

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        console.error("ADD PRODUCT ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= UPDATE PRODUCT ================= */
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                image,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            message: "Product updated successfully",
            product
        });

    } catch (err) {
        console.error("UPDATE PRODUCT ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= DELETE PRODUCT ================= */
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    } catch (err) {
        console.error("DELETE PRODUCT ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};
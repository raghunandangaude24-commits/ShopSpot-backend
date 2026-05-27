const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/* ================= REGISTER USER ================= */

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        /* ===== VALIDATION ===== */

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        /* ===== CHECK USER ===== */

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        /* ===== HASH PASSWORD ===== */

        const hashedPassword = await bcrypt.hash(password, 10);

        /* ===== CREATE USER ===== */

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        /* ===== RESPONSE ===== */

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

/* ================= LOGIN USER ================= */

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        /* ===== VALIDATION ===== */

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        /* ===== FIND USER ===== */

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        /* ===== CHECK PASSWORD ===== */

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        /* ===== RESPONSE ===== */

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
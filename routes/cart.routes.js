const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const cart = require("../controllers/cart.controller");

// GET CART
router.get("/", auth, cart.getCart);

// ADD TO CART
router.post("/add", auth, cart.addToCart);

// UPDATE QUANTITY
router.put("/update/:productId", auth, cart.updateQuantity);

// REMOVE ITEM
router.delete("/remove/:productId", auth, cart.removeFromCart);

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const cart = require("../controllers/cart.controller");

router.get("/", auth, cart.getCart);
router.post("/add", auth, cart.addToCart);

module.exports = router;
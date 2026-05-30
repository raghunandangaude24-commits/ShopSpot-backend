const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const order = require("../controllers/order.controller");

router.post("/", auth, order.createOrder);
router.get("/", auth, order.getOrders);

module.exports = router;
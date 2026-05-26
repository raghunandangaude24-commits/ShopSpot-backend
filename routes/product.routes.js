const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");

router.get("/", product.getProducts);
router.post("/", product.addProduct);

module.exports = router;
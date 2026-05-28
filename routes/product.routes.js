const express = require("express");

const router = express.Router();

const productController =
    require("../controllers/product.controller");

/* ================= GET ALL PRODUCTS ================= */

router.get("/", productController.getProducts);

/* ================= GET SINGLE PRODUCT ================= */

router.get("/:id", productController.getSingleProduct);

/* ================= ADD PRODUCT ================= */

router.post("/", productController.addProduct);

/* ================= DELETE PRODUCT ================= */

router.delete("/:id", productController.deleteProduct);

module.exports = router;
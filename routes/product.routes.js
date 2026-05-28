const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

/* ================= GET ALL ================= */
router.get("/", productController.getProducts);

/* ================= GET SINGLE ================= */
router.get("/:id", productController.getSingleProduct);

/* ================= ADD ================= */
router.post("/", productController.addProduct);

/* ================= UPDATE ================= */
router.put("/:id", productController.updateProduct);

/* ================= DELETE ================= */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
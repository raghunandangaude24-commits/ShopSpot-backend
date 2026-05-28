const express = require("express");

const router = express.Router();

const productController =
    require("../controllers/product.controller");

/* ================= AUTH MIDDLEWARE ================= */

const {
    protect,
    admin
} = require("../middleware/auth.middleware");

/* ================= GET ALL PRODUCTS ================= */

router.get(
    "/",
    productController.getProducts
);

/* ================= GET SINGLE PRODUCT ================= */

router.get(
    "/:id",
    productController.getSingleProduct
);

/* ================= ADD PRODUCT ================= */

router.post(
    "/",
    protect,
    admin,
    productController.addProduct
);

/* ================= UPDATE PRODUCT ================= */

router.put(
    "/:id",
    protect,
    admin,
    productController.updateProduct
);

/* ================= DELETE PRODUCT ================= */

router.delete(
    "/:id",
    protect,
    admin,
    productController.deleteProduct
);

module.exports = router;
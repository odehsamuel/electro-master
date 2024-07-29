const express = require("express");

const adminController = require("../controller/admin-controller")
const imageCustomMiddleware = require("../middlewares/multerMiddleware")

const router = express.Router();

router.get("/products", adminController.getProducts);

router.post("/products", imageCustomMiddleware , adminController.createNewProducts);

router.get("/products/new", adminController.getNewProducts);

router.get("/products/edit/:productId", adminController.getOne);

router.post("/products/edit/:productId", imageCustomMiddleware, adminController.updateOne);

router.delete("/products/delete/:productId", adminController.removeProduct)


module.exports = router
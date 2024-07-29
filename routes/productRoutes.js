const express = require('express')

const productController = require("../controller/product-controller")

const router  = express.Router()

router.get('/product', productController.getProducts)

router.get('/checkout', productController.getCheckout)

router.post('/checkout', productController.checkout)

router.get('/store', productController.getStore)


module.exports = router;
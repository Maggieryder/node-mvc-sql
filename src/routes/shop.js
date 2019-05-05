const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postDeleteCartItem);

router.post('/create-order', shopController.postOrders);

router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
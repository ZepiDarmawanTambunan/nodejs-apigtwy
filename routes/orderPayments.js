const express = require('express');
const router = express.Router();

const ordersPaymentsHandler = require('./handler/order-payment');

router.get('/', ordersPaymentsHandler.getOrders);

module.exports = router;

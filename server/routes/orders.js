const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// @route   POST api/orders
// @access  Private
router.post('/', auth, orderController.createOrder);

// @route   GET api/orders
// @access  Private
router.get('/', auth, orderController.getOrders);

module.exports = router;

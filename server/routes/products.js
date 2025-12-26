const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// @route   GET api/products
// @access  Public
router.get('/', productController.getProducts);

// @route   POST api/products
// @access  Private (Supplier)
router.post('/', auth, productController.createProduct);

// @route   PUT api/products/:id/status
// @access  Private (Admin)
router.put('/:id/status', auth, productController.updateProductStatus);

module.exports = router;

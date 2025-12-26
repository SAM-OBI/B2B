const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
};

// @route   GET api/analytics
// @access  Private (Admin)
router.get('/', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const pendingProducts = await Product.countDocuments({ status: 'Pending' });
        
        // Calculate Total Revenue (Assuming completed orders)
        // Ideally we would filter by status: 'Delivered' or 'Paid' once we implement those statuses fully
        // For now, we sum all orders
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        
        // New Users (last 30 days) - optional enhancement
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const newUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        res.json({
            totalUsers,
            newUsers,
            pendingProducts,
            totalRevenue: Math.round(totalRevenue * 100) / 100 // Round to 2 decimals
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

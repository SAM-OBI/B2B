const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
};

// @route   GET api/users
// @access  Private (Admin)
router.get('/', auth, adminAuth, userController.getAllUsers);

// @route   PUT api/users/:id/status
// @access  Private (Admin)
router.put('/:id/status', auth, adminAuth, userController.updateUserStatus);

// @route   DELETE api/users/:id
// @access  Private (Admin)
router.delete('/:id', auth, adminAuth, userController.deleteUser);

module.exports = router;

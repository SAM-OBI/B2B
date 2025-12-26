const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Auth Rate Limiter
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { msg: 'Too many attempts, please try again after 10 minutes' }
});

// @route   POST api/auth/register
// @access  Public
router.post('/register', authLimiter, authController.register);

// @route   POST api/auth/login
// @access  Public
router.post('/login', authLimiter, authController.login);

// @route   GET api/auth/logout
// @access  Private
router.get('/logout', authController.logout);

// @route   GET api/auth/user
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const User = require('../models/User'); // Import here or top
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

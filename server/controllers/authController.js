const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to send token via cookie
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });

    const options = {
        expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token, // Optional: keeping it for now if frontend wants to use it, but cookie is primary
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, companyName } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            companyName
        });

        await user.save();
        sendTokenResponse(user, 200, res);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Honeypot Check (Bot Protection)
        if (req.body.website_trap) {
            console.warn(`Bot detected! IP: ${req.ip} tried to login with honeypot field.`);
            return res.status(400).json({ msg: 'Invalid Credentials' }); // Don't reveal why
        }

        // IP Tracking
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        user.lastLoginIP = ip;
        user.loginHistory.push({ ip: ip });
        
        // Keep history size manageable (last 50)
        if (user.loginHistory.length > 50) {
            user.loginHistory.shift();
        }
        
        await user.save();

        sendTokenResponse(user, 200, res);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, data: {} });
};

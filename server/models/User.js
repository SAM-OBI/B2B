const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Buyer', 'Supplier', 'Admin'],
        default: 'Buyer'
    },
    companyName: {
        type: String,
        required: function() { return this.role === 'Supplier'; }
    },
    status: {
        type: String,
        enum: ['Active', 'Banned'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLoginIP: {
        type: String
    },
    loginHistory: [{
        ip: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('User', userSchema);

const Order = require('../models/Order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentReference } = req.body;

        // Verify Payment with Paystack
        if (paymentReference) {
            try {
                const response = await axios.get(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    }
                });

                if (response.data.data.status !== 'success') {
                    return res.status(400).json({ msg: 'Payment verification failed' });
                }
                
                // Optional: Check if amount matches (Paystack amount is in kobo)
                // if (response.data.data.amount !== totalAmount * 100) ...

            } catch (err) {
                console.error('Paystack Error:', err.message);
                return res.status(400).json({ msg: 'Payment verification error' });
            }
        }

        const newOrder = new Order({
            buyer: req.user.id,
            products,
            totalAmount,
            shippingAddress,
            paymentInfo: {
                reference: paymentReference,
                status: paymentReference ? 'Paid' : 'Pending',
                paidAt: paymentReference ? Date.now() : null
            }
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrders = async (req, res) => {
    try {
        // If Admin, return all. If User, return theirs.
        let query = {};
        if (req.user.role === 'Admin') {
            query = {};
        } else if (req.user.role === 'Supplier') {
            // Complex query to find orders containing supplier's products would go here
            // For MVP simplify or skip
             // Ideally we filter orders where products.product.supplier == req.user.id
        } else {
            query = { buyer: req.user.id };
        }

        const orders = await Order.find(query)
            .populate('buyer', 'name email')
            .populate('products.product', 'name price');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

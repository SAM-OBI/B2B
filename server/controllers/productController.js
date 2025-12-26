const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        } else {
            // Default to Approved for public catalog if no status specified
            // But if we want to be safe, maybe strictly separate logic. 
            // For simplicty: If no query, return Approved. If query, return match.
            query.status = 'Approved';
        }
        
        // Allow Admins to see all if they pass a special flag or just rely on status filter?
        // Let's rely on status filter. Admin client specifically asks for 'Pending'.
        
        const products = await Product.find(query).populate('supplier', 'name companyName');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
            stock,
            supplier: req.user.id
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateProductStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.status = status;
        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

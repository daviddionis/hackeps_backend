const Product = require("../models/Product");

const productsCtrls = {};

productsCtrls.listProduct = async (req, res) => {
    const { prodId } = req.params;
    try {
        const product = await Product.findById(prodId);
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

productsCtrls.listProducts = async (req, res) => {
    let { q, limit } = req.query;

    limit = limit || 20;

    try {
        let products = [];

        if (q)
            products = await Product.findWithTextQuery(q);
        else
            products = await Product.findLimited(limit);

        res.status(200).json({ success: true, products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = productsCtrls;
const { listProduct, listProducts } = require('../controllers/products.controllers');

const router = require('express').Router();

router.route('/')
    .get(listProducts)

router.route('/:prodId')
    .get(listProduct)

module.exports = router;
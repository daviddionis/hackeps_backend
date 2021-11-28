const { listRoomProducts, createRoomProduct } = require('../controllers/roomProducts.controllers');
const { isLoggedIn } = require('../middlewares/rooms.middlewares');

const router = require('express').Router();

router.route('/')
    .post(createRoomProduct)
    .get(listRoomProducts);

module.exports = router;
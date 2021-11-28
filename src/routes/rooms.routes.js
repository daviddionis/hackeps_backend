const { createRoom, verifyRoom } = require('../controllers/rooms.controllers');

const router = require('express').Router();

router.route('/')
    .get(createRoom);

router.route('/:roomCode/verify')
    .get(verifyRoom);

module.exports = router;
const Room = require("../models/Room");

const roomsCtrls = {};

roomsCtrls.createRoom = async (req, res) => {
    try {
        let room = new Room(req.body);
        room = await Room.create(room);
        res.status(200).json({ success: true, room });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

roomsCtrls.verifyRoom = async (req, res) => {
    const { roomCode } = req.params;
    try {
        const room = await Room.findByCode(roomCode);
        if (room)
            res.status(200).json({ success: true, room });
        else
            res.status(404).json({ success: false, message: 'Room not found' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = roomsCtrls;
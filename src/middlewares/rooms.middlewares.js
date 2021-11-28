const Room = require("../models/Room");

const roomsMdls = {};

roomsMdls.isLoggedIn = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const room = await Room.findByCode(authorization);
        if (room) {
            req.room = room;
            next();
        } else
            res.status(401).json({ success: false, message: "Unauthorized" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = roomsMdls;
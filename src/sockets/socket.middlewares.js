const e = require("cors");
const Room = require("../models/Room");

const socketMlds = {};

socketMlds.checkRoomIsValid = (roomCode) =>
    new Promise(async (resolve, reject) => {
        try {
            const room = await Room.findByCode(roomCode);
            if (room)
                return resolve([true, room.RoomID]);
            else
                return resolve([false, null]);
        } catch (err) {
            return reject(err);
        }
    });

module.exports = socketMlds;
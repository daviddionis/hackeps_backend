const pool = require('../database');

const Room = function (newRoom) {
    this.RoomID = newRoom.RoomID;
    this.RoomCode = newRoom.RoomCode;
}

Room.create = (newRoom) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                INSERT INTO rooms
                SET ?
            `, [newRoom]);
            newRoom.RoomID = res.insertId;
            return resolve(newRoom);
        } catch (err) {
            return reject(err);
        }
    });

Room.findByCode = (code) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM rooms
                WHERE RoomCode = ?
            `, [code]);
            return resolve(res[0]);
        } catch (err) {
            return reject(err);
        }
    });

module.exports = Room;
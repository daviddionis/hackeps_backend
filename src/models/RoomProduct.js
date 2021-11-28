
const pool = require('../database');

const RoomProduct = function (newRoomProduct) {
    this.RoomProdID = newRoomProduct.RoomProdID;
    this.RoomProdQuantity = newRoomProduct.RoomProdQuantity;
    this.ProdID = newRoomProduct.ProdID;
    this.RoomID = newRoomProduct.RoomID;
}

RoomProduct.create = (newRoomProduct) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                INSERT INTO room_products
                SET ?
            `, [newRoomProduct]);
            newRoomProduct.RoomProdID = res.insertId;
            return resolve(newRoomProduct);
        } catch (err) {
            return reject(err);
        }
    });

RoomProduct.findById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM room_products
                WHERE RoomProdID = ?
            `, [id]);
            return resolve(res[0]);
        } catch (err) {
            return reject(err);
        }
    });

RoomProduct.findByProdId = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM room_products
                WHERE ProdID = ?
            `, [id]);
            return resolve(res[0]);
        } catch (err) {
            return reject(err);
        }
    });

RoomProduct.findLimited = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT p.*, rP.RoomProdQuantity FROM products p
                LEFT JOIN room_products rP ON p.ProdID = rP.ProdID
            `, []);
            return resolve(res);
        } catch (err) {
            return reject(err);
        }
    });

RoomProduct.updateById = (roomProdId, roomProduct) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                UPDATE room_products
                SET ?
                WHERE RoomProdID = ?
            `, [roomProduct, roomProdId]);
            return resolve(res);
        } catch (err) {
            return reject(err);
        }
    });

RoomProduct.deleteById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                DELETE FROM room_products
                WHERE RoomProdID = ?
            `, [id]);
            return resolve(res);
        } catch (err) {
            return reject(err);
        }
    });

module.exports = RoomProduct;
const pool = require('../database');

const Product = function (newProduct) {
    this.ProdID = newProduct.ProdID;
    this.ProdName = newProduct.ProdName;
    this.ProdPrice = newProduct.ProdPrice;
    this.ProdDescription = newProduct.ProdDescription;
    this.ProdImageURL = newProduct.ProdImageURL;
}

Product.create = (newProduct) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                INSERT INTO products
                SET ?
            `, [newProduct]);
            newProduct.RoomID = res.insertId;
            return resolve(newProduct);
        } catch (err) {
            return reject(err);
        }
    });

Product.findById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM products
                WHERE ProdID = ?
            `, [id]);
            return resolve(res[0]);
        } catch (err) {
            return reject(err);
        }
    });

Product.findLimited = (limit) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM products
                LIMIT ${limit}
            `, [limit]);
            return resolve(res);
        } catch (err) {
            return reject(err);
        }
    });

Product.findWithTextQuery = (q) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await pool.query(`
                SELECT * FROM products
                WHERE ProdName LIKE '%${q}%'
                OR ProdDescription LIKE '%${q}%'
            ` );
            return resolve(res);
        } catch (err) {
            return reject(err);
        }
    });

module.exports = Product;
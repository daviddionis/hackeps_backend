const RoomProduct = require("../models/RoomProduct");

const roomProducts = {};

roomProducts.listRoomProducts = async (req, res) => {
    try {
        let roomProducts = [];

        roomProducts = await RoomProduct.findLimited();

        res.status(200).json({ success: true, products: roomProducts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

};

roomProducts.createRoomProduct = async (req, res) => {
    const { prodId } = req.body;
    let quantity = req.body.quantity || 0;
    quantity = Math.max(quantity, 0);

    let roomProduct = await RoomProduct.findByProdId(prodId);

    if (roomProduct) {
        await RoomProduct.updateById(roomProduct.RoomProdID, { RoomProdQuantity: quantity });
    } else {
        roomProduct = await RoomProduct.create({ ProdID: prodId, RoomProdQuantity: quantity });
    }
    res.status(200).json({ success: true, roomProduct });
}

module.exports = roomProducts;
const RoomProduct = require("../models/RoomProduct");

const socketsCtrls = {};

socketsCtrls.addProduct = async (client, payload) => {
    const roomProduct = await RoomProduct.create(payload);

    client.emit(SOCKET_EVENTS.PRODUCT_ADDED, roomProduct);
};

socketsCtrls.updateProduct = async (client, payload) => {
    const { RoomProdID: roomProdId } = payload;
    let roomProduct = await RoomProduct.findById(roomProdId);
    roomProduct = new RoomProduct({ ...roomProduct, ...payload });

    await RoomProduct.findByRoomId(roomProdId);

    client.emit(SOCKET_EVENTS.PRODUCT_UPDATED, roomProduct);
}

socketsCtrls.deleteProduct = async (client, payload) => {
    const { RoomProdID: roomProdId } = payload;
    const roomProduct = await RoomProduct.findById(roomProdId);
    await RoomProduct.deleteById(roomProdId);

    client.emit(SOCKET_EVENTS.PRODUCT_DELETED, roomProduct);
}

module.exports = socketsCtrls;
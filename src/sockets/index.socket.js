
const { io } = require('../index');
const { checkRoomIsValid } = require('./socket.middlewares');
const { addProduct, updateProduct } = require('./sockets.controllers');

io.on('connection', async (client) => {
    console.log('Client connected');
    const roomCode = client.handshake.headers.authorization;
    const [allowed, roomId] = await checkRoomIsValid(roomCode);

    if (!allowed)
        return client.disconnect();

    client.join(roomCode);

    client.on(SOCKET_EVENTS.ADD_PRODUCT, async (payload) =>
        await addProduct(client, { ...payload, RoomID: roomId }));

    client.on(SOCKET_EVENTS.UPDATE_PRODUCT, async (payload) =>
        await updateProduct(client, { ...payload, RoomID: roomId }));

    client.emit('HOLA', 'hola');

});

module.exports = io;
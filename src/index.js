require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
require('./sockets/index.socket');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/products', require('./routes/products.routes'));
app.use('/rooms', require('./routes/rooms.routes'));
app.use('/roomProducts', require('./routes/roomProducts.routes'));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
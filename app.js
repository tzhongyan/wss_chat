const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
// Express serve view file
app.use('/' , express.static(__dirname + '/public'));

// Setup ws
const server = createServer(app);
const wss = new WebSocket.Server({server});

// on connection
wss.on('connection', (ws) => {
    console.log(`Wild connection appear! Connected: ${wss.clients.size}`);
    ws.send(`Welcome! ${ws._socket.remoteAddress}:${ws._socket.remotePort}`);

    ws.on('message', data => {
        // broadcast message on receiving
        broadcast(wss, ws, data);
    });

    // on disconnection
    ws.on('close', () => {
        console.log(`Someone left! Connected: ${wss.clients.size}`);
    });
});




/**
 * Broadcasts data to all clients in wss
 * @param {WebSocket.Server} wss WebSocket Server
 * @param {WebSocket} ws The server itself
 * @param {*} data 
 */
function broadcast(wss, ws, data) {
    console.log(`Received message: [${data}], broadcasting`);
    wss.clients.forEach((client) => {
        if (client != ws && client.readyState == WebSocket.OPEN) {
            client.send(data);
        }
    });
}



server.listen(3000, () => {
    console.log(`Listening on port 3000`)
});

const express = require('express');

// Setup ws
// const WebSocket = require('ws');
// const wss = new WebSocket.Server('ws://jp.tzhongyan.com/ws');

let app = express();
// Express serve view file
app.use('/' , express.static(__dirname + '/public'));
app.listen(3000, () => {
    console.log(`Listening on port 3000`)
});

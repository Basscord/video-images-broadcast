const credentials = require('./credentials');
const express = require('express');
const app = express();
let server;
let port;
if (credentials.key && credentials.cert) {
  const https = require('https');
  server = https.createServer(credentials, app);
  port = 443;
} else {
  const http = require('http');
  server = http.createServer(app);
  port = 3000;
}
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));
io.sockets.on('error', e => console.log(e));
io.sockets.on('connection', function (socket) {
  socket.on('sendImage', function (data) {
    socket.broadcast.emit('getImage', data);
  });
});
server.listen(port, () => console.log(`Server is running on port ${port}`));

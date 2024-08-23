'use strict';

const net = require('net');
let connections = [];

const server = net.createServer(function (connection) {
    connections.push(connection);

    connection.on('close', function () {
        let index = connections.indexOf(connection);
        if (index !== -1) {
            connections.splice(index, 1);
        }
    });
});

setInterval(function () {
    let data = JSON.stringify({
        pid: process.pid,
        timestamp: Date.now(),
        connections: connections.length
    });

    connections.forEach(function (connection) {
        connection.write(data);
    });
}, 1000);

server.listen(5432, function () {
    console.log('Listening for subscribers...');
});
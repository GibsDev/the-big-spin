import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import path from 'path';
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
});

const port = 3000;

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
    socket.on('cool event', payload => {
        console.log(payload);
    });
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`The Big Spin server listening on port ${port}`);
});
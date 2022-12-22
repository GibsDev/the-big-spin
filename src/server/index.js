import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import path from 'path';
import INITIAL_GAME_STATE from "../gameState";
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

const connections = {};

//Track game state on the server side
let gameState = INITIAL_GAME_STATE;

io.on('connection', (socket) => {
    console.log('A user connected');
    connections[socket.id] = socket;

    // Broadcast game state on connection
    function broadcastState() {
        for (const socket of Object.values(connections)) {
            socket.emit('gameState', gameState);
        }
    }

    broadcastState();

    // Rebroadcast any socket events to all connections
    socket.onAny((eventName, ...args) => {
        if (eventName === 'gameState') {
            gameState = args[0];
            broadcastState();
        }
        for (const socket of Object.values(connections)) {
            socket.emit(eventName, ...args);
        }
    });

    socket.on('disconnect', () => {
        delete connections[socket.id];
    });
});

server.listen(port, () => {
    console.log(`The Big Spin server listening on port ${port}`);
});
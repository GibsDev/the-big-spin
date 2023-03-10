import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import AdminPage from './AdminPage';
import PlayerPage from './PlayerPage';
import Board from './Board';
import Home from './Home';

import io from 'socket.io-client';
import {createContext, useEffect, useState} from "react";

const socket = io();

export const GameStateContext = createContext({});
export const SocketContext = createContext(socket);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/board', // Game board
        element: <Board />,
    },
    {
        path: '/player1', // Game board
        element: <PlayerPage id={1} />,
    },
    {
        path: '/player2', // Game board
        element: <PlayerPage id={2} />,
    },
    {
        path: '/player3', // Game board
        element: <PlayerPage id={3} />,
    },
    {
        path: '/admin', // Game board
        element: <AdminPage />,
    },
]);

export const App = () => {

    const [,setIsConnected] = useState(socket.connected);
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('gameState', state => {
            setGameState(state);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('gameState');
        };
    }, []);

    return <SocketContext.Provider value={socket}>
        <GameStateContext.Provider value={gameState}>
            <RouterProvider router={router}/>
        </GameStateContext.Provider>
    </SocketContext.Provider>;
};

export default App;
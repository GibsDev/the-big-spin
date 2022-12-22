import {useContext, useEffect} from 'react';
import {SocketContext} from './App';
import DebugGameState from './DebugGameState';
import PlayersDisplay from './PlayersDisplay';

const Board = () => {

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('spin', () => {
            console.log('spinning');
        });
    });

    return <>
        <DebugGameState />
        <PlayersDisplay />
    </>;
};

export default Board;
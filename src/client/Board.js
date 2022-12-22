import {useContext, useEffect} from 'react';
import {SocketContext} from './App';
import DebugGameState from './DebugGameState';

const Board = () => {

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('spin', () => {
            console.log('spinning');
        });
    });

    return <>
        <DebugGameState />
        <div>Here is the board</div>
    </>;
};

export default Board;
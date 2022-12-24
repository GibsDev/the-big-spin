import {useContext, useEffect} from 'react';
import {SocketContext} from './App';
import DebugGameState from './DebugGameState';
import PlayersDisplay from './PlayersDisplay';
import Wheel from './Wheel';
import Spinner from './Spinner';

const Board = () => {

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('spin', () => {
            console.log('spinning');
        });
    });

    return <>
        <Wheel />
        <DebugGameState />
        <Spinner />
        <PlayersDisplay admin={false}/>
    </>;
};

export default Board;
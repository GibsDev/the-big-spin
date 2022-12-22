import {useContext} from 'react';
import {GameStateContext, SocketContext} from './App.js';
import DebugGameState from './DebugGameState';
import clsx from 'clsx';

const PlayerPage = ({id}) => {

    const gameState = useContext(GameStateContext);
    const socket = useContext(SocketContext);

    const isMyTurn = gameState.currentPlayer === id;

    const spin = () => {
        if (isMyTurn) {
            socket.emit('spin');
        }
    };

    return <>
        <DebugGameState/>
        <h1 className="title">Player {id}</h1>
        <button className={clsx('spinButton', { active: isMyTurn })} onClick={spin}>Spin</button>
    </>;
};

export default PlayerPage;
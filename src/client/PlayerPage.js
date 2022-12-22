import {useContext} from 'react';
import {GameStateContext, SocketContext} from './App.js';
import DebugGameState from "./DebugGameState";

const PlayerPage = ({id}) => {

    const gameState = useContext(GameStateContext);
    const socket = useContext(SocketContext);

    const isMyTurn = gameState.currentTeam === id;

    const spin = () => {
        if (isMyTurn) {
            socket.emit('spin');
        }
    };

    return <>
        <DebugGameState/>
        <h1 className="title">Player {id}</h1>
        {isMyTurn && <button className="spinButton" onClick={spin}>Spin</button>}
    </>;
};

export default PlayerPage;
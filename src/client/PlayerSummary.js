import {useContext} from "react";
import {GameStateContext, SocketContext} from "./App";
import clsx from "clsx";

const PlayerSummary = ({id, name, cash, bank, children, admin}) => {

    const backgroundColors = ['red', 'gold', 'blue'];
    const gameState = useContext(GameStateContext);
    const socket = useContext(SocketContext);

    const active = gameState.currentPlayer === id;

    const selectPlayer = () => {
        if (admin) {
            socket.emit('gameState', {
                ...gameState,
                currentPlayer: id
            });
        }
    };

    return <button
        onClick={selectPlayer}
        className={clsx('playerSummary', {active})}
        style={{background: backgroundColors[id - 1]}}>{children}</button>;
};

export default PlayerSummary;
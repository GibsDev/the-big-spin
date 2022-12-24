import DebugGameState from './DebugGameState';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import gameSlice from './gameSlice';

const PlayerPage = ({id}) => {

    const currentPlayerId = useSelector(gameSlice.selectors.currentPlayer);

    const isMyTurn = currentPlayerId === id;

    const spin = () => {
        if (isMyTurn) {
            // socket.emit('spin');
        }
    };

    return <>
        <DebugGameState/>
        <h1 className={clsx('title', {active: isMyTurn})}>Player {id}</h1>
        <button className={clsx('spinButton', { active: isMyTurn })} onClick={spin}>Spin</button>
    </>;
};

export default PlayerPage;
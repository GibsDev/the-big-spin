import clsx from 'clsx';
import {useSelector} from 'react-redux';
import gameSlice from './gameSlice';

const PlayerSummary = ({id, name, cash, bank, children, admin}) => {

    const backgroundColors = ['red', 'gold', 'blue'];

    const currentPlayer = useSelector(gameSlice.selectors.currentPlayer);
    const active = currentPlayer === id;

    const selectPlayer = () => {

    };

    return <button
        onClick={selectPlayer}
        className={clsx('playerSummary', {active})}
        style={{background: backgroundColors[id - 1]}}>{children}</button>;
};

export default PlayerSummary;
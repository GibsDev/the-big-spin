import DebugGameState from './DebugGameState';
import PlayersDisplay from './PlayersDisplay';
import Spinner from './Spinner';

const Board = () => {

    return <>
        <DebugGameState />
        <Spinner />
        <PlayersDisplay admin={false}/>
    </>;
};

export default Board;
import {useContext} from "react";
import {GameStateContext} from "./App";

export default function DebugGameState() {
    const gameState = useContext(GameStateContext);
    return <pre>{JSON.stringify(gameState)}</pre>
}
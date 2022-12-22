import PlayerSummary from "./PlayerSummary";

export default function PlayersDisplay() {
    return <div className="players">
        <PlayerSummary id={1}>Player 1</PlayerSummary>
        <PlayerSummary id={2}>Player 2</PlayerSummary>
        <PlayerSummary id={3}>Player 3</PlayerSummary>
    </div>;
}
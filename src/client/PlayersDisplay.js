import PlayerSummary from "./PlayerSummary";

export default function PlayersDisplay({admin}) {
    return <div className="players">
        <PlayerSummary id={1} admin={admin}>Player 1</PlayerSummary>
        <PlayerSummary id={2} admin={admin}>Player 2</PlayerSummary>
        <PlayerSummary id={3} admin={admin}>Player 3</PlayerSummary>
    </div>;
}
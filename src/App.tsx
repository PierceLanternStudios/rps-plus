import React from "react";
import { type Move, MOVES } from "./Move";
import gamePhaseCSS from "./gamePhase.module.css";
import ResultPhaseCSS from "./resultsPhase.module.css";
import cardCSS from "./card.module.css";

type GamePhase = "pre-Game" | "Game" | "Results";
type gamePlayer = "You" | "Computer";
type GameResult = gamePlayer | "Tie";

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [roundResult, setRoundResult] = React.useState<GameResult>("Tie");

  // ###################################################################
  // =================  Callback Functions:  ===========================
  // ###################################################################
  function newRound() {
    setGamePhase("Game");
    setRound(round + 1);
  }

  // ###################################################################
  // =================  Solve Game Results:  ===========================
  // ###################################################################

  /**
   * name:          processResults
   * description:   Solves the result of a round, and updates state variables
   *                accordingly for display.
   * arguments:     none
   * returns:       none
   * effects:       will update round state variables for display.
   * notes:         This function uses the `!` operator a few times. This is
   *                guaranteed to be safe, as the playerCard and computerCard
   *                state are guaranteedly set to a non-null card before this
   *                function is called. In fact, the only time those variables
   *                are ever null is when they are first declared, and are
   *                then assigned at the beginning of the first round.
   */
  function processResults() {
    // determine who would win this round:
    if (playerMove === computerMove) {
      console.log(playerMove, computerMove);
      setRoundResult("Tie");
    } else {
      setRoundResult(
        MOVES.indexOf(playerMove!) === (MOVES.indexOf(computerMove!) + 1) % 3
          ? "Computer"
          : "You"
      );
    }
    setGamePhase("Results");
  }

  function onCardPlayed(cardName: Move) {
    setPlayerMove("paper");
    setComputerMove(MOVES[Math.floor(Math.random() * MOVES.length)]);
    processResults();
  }

  // ###################################################################
  // =================  Render Game Phases:  ===========================
  // ###################################################################

  // render pregame screen:
  function renderPreGame() {
    return <button onClick={newRound}>Begin Game</button>;
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>Play a Card! {renderHand()}</div>
    );
  }

  function renderResults() {
    console.log("rendering!");
    return (
      <div className={ResultPhaseCSS.container}>
        <span>Round #{round}:</span>
        <span>Computer Played: {computerMove}</span>
        <span>You Played: {playerMove}</span>
        <span>Round Winner: {roundResult}!</span>
        <span>
          <button onClick={newRound}>New Round!</button>
        </span>
      </div>
    );
  }

  // ###################################################################
  // =================  Render Subcomponents:  =========================
  // ###################################################################

  function renderHand() {
    return (
      <div className={cardCSS.hand_container}>
        <ul>{MOVES.map((move) => renderCard(move))}</ul>
      </div>
    );
  }

  function renderCard(cardName: Move) {
    return (
      <button className={cardCSS.button} onClick={() => onCardPlayed(cardName)}>
        {cardName}
      </button>
    );
  }

  // ###################################################################
  // ======================  Main Loop:  ===============================
  // ###################################################################
  //determine what to do based on the phase of the game:
  switch (gamePhase) {
    case "pre-Game":
      return renderPreGame();
    case "Game":
      return renderGamePhase();
    case "Results":
      return renderResults();
  }
}

export default App;

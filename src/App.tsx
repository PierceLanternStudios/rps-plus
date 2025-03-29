import React from "react";
import { type Move, MOVES } from "./Move";
import gamePhaseCSS from "./gamePhase.module.css";
import ResultPhaseCSS from "./resultsPhase.module.css";
import cardCSS from "./card.module.css";

type GamePhase = "pre-Game" | "Game" | "Results";
type gamePlayer = "You" | "Computer";
type GameResult = gamePlayer | "Tie";

/**
 * name:          App
 * description:   Main component for the Rock-Paper-Scissors game. Manages the
 *                game state, handles user interactions, and renders the
 *                appropriate UI based on the current game phase.
 * arguments:     none
 * returns:       JSX.Element - The rendered UI for the current game phase.
 * effects:       Manages state transitions and user interactions for the game.
 * notes:         The game consists of three phases: "pre-Game", "Game", and
 *                "Results". State variables are used to track the player's
 *                move, computer's move, the current round, and the result of
 *                each round.
 */

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [roundResult, setRoundResult] = React.useState<GameResult>("Tie");
  const [computerWins, setComputerWins] = React.useState<number>(0);
  const [playerWins, setPlayerWins] = React.useState<number>(0);
  const [ties, setTies] = React.useState<number>(0);

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
  function processResults(player: Move, computer: Move) {
    // determine who would win this round:
    const winner = getWinner(player, computer);
    setRoundResult(winner);

    // keep track of stats:
    switch (winner) {
      case "You":
        setPlayerWins(playerWins + 1);
        break;
      case "Computer":
        setComputerWins(computerWins + 1);
        break;
      case "Tie":
        setTies(ties + 1);
        break;
    }

    // display results:
    setGamePhase("Results");
  }

  function getWinner(player: Move, computer: Move): GameResult {
    if (player === computer) {
      return "Tie";
    } else {
      return MOVES.indexOf(player!) === (MOVES.indexOf(computer!) + 1) % 3
        ? "Computer"
        : "You";
    }
  }

  /**
   * name:          onCardPlayed
   * description:   Handles the logic for when a player selects a card to play.
   *                This function determines the computer's move, updates the
   *                state variables for the player's and computer's moves, and
   *                processes the results of the round.
   * arguments:
   *    - cardName: Move - The move selected by the player.
   * returns:       none
   * effects:       Updates the state variables for playerMove, computerMove,
   *                and triggers the processResults function to determine the
   *                outcome of the round.
   * notes:         The computer's move is randomly selected from the MOVES array.
   */
  function onCardPlayed(cardName: Move) {
    const tempCompMove = MOVES[Math.floor(Math.random() * MOVES.length)];

    setPlayerMove(cardName);
    setComputerMove(tempCompMove);
    processResults(cardName, tempCompMove);
  }

  // ###################################################################
  // =================  Render Game Phases:  ===========================
  // ###################################################################

  function renderPreGame() {
    return <button onClick={newRound}>Begin Game</button>;
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>Play a Card! {renderHand()}</div>
    );
  }

  function renderResults() {
    return (
      <div className={ResultPhaseCSS.container}>
        <span>Round #{round}:</span>
        <span>Computer Played: {computerMove}</span>
        <span>You Played: {playerMove}</span>
        <span>Round Winner: {roundResult}!</span>
        <span>
          Stats:{" "}
          <b>
            {playerWins} {playerWins === 1 ? "win" : "wins"} / {computerWins}
            {computerWins === 1 ? " loss" : " losses"} / {ties}
            {ties === 1 ? " tie" : " ties"}
          </b>
        </span>
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

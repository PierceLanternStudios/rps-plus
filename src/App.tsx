import React from "react";
import { type Move, MOVES } from "./Move";
import Player from "./Player";
import AIPlayer from "./AIPlayer";
import gamePhaseCSS from "./gamePhase.module.css";
import cardCSS from "./card.module.css";
import Card from "./Card";

type GamePhase = "pre-Game" | "Draw" | "Game" | "Results" | "Shop";
type gamePlayer = "Player 1" | "Player 2";
type GameResult = gamePlayer | "Tie";

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [player, setPlayer] = React.useState<Player>(new Player());
  const [computer, setComputer] = React.useState<AIPlayer>(new AIPlayer());
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [leader, setleader] = React.useState<gamePlayer>("Player 1");
  const [roundResult, setRoundResult] = React.useState<GameResult>("Tie");

  // ###################################################################
  // =================  Callback Functions:  ===========================
  // ###################################################################
  function newRound() {
    setGamePhase("Draw");
    setRound(round + 1);
    setleader(leader === "Player 1" ? "Player 2" : "Player 1");
  }

  function onCardSelected(card: Card) {
    player.playCard(card);
    computer.playCard();
    setGamePhase("Results");
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
    if (player.playedCard!.cardType === computer.playedCard!.cardType) {
      setRoundResult("Tie");
    } else {
      setRoundResult(
        MOVES.indexOf(player.playedCard!.cardType) ===
          (MOVES.indexOf(computer.playedCard!.cardType) + 1) % 3
          ? "Player 2"
          : "Player 1"
      );
    }
  }

  // ###################################################################
  // =================  Render Game Phases:  ===========================
  // ###################################################################

  // render pregame screen:
  function renderPreGame() {
    return <button onClick={newRound}>Begin Game</button>;
  }

  // render draw phase, in case I want to do any draw animations or anything:
  function renderDrawPhase() {
    player.makeHand();
    computer.makeHand();
    setGamePhase("Game");
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>My Hand: {renderHand()}</div>
    );
  }

  function renderResults() {
    processResults();
    return <div>results:</div>;
  }

  // ###################################################################
  // =================  Render Subcomponents:  =========================
  // ###################################################################

  function renderHand() {
    return (
      <div className={cardCSS.hand_container}>
        <ul>
          {player.hand.map((card) => (
            <button
              className={cardCSS.button}
              onClick={() => onCardSelected(card)}
            >
              {card.DEBUG_toString()}
            </button>
          ))}
        </ul>
      </div>
    );
  }

  // ###################################################################
  // ======================  Main Loop:  ===============================
  // ###################################################################
  //determine what to do based on the phase of the game:
  switch (gamePhase) {
    case "pre-Game":
      return renderPreGame();

    case "Draw":
      return renderDrawPhase();
    case "Game":
      return renderGamePhase();
    case "Results":
      return renderResults();
    case "Shop":
      return <div>SHOP!</div>;
  }
}

export default App;
/*



*/
// OLD APP functionality:

// const [computerMove, setComputerMove] = React.useState(getRandomMove());
// const [player, SetPlayer] = React.useState(new Player());
// return (
//   <div>
//     Computer Move: {computerMove} Player Hand: {player.DEBUG_printHand()}
//   </div>
// );

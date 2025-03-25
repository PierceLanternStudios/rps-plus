import React from "react";
import { type Move, moves } from "./Move";
import Player from "./Player";
import AIPlayer from "./AIPlayer";
import gamePhaseCSS from "./gamePhase.module.css";
import cardCSS from "./card.module.css";
import Card from "./Card";

type GamePhase = "pre-Game" | "Draw" | "Game" | "Results" | "Shop";
type leader = "Player 1" | "Player 2";

/**
 * GAME_PLAYERS
 *
 * This will be a variable that will allow configuration of who is
 * playing the game. For the time being, this must be set to Player
 * AIPlayer, but in the future this will be expanded to allow more
 * choices.
 *
 */
const GAME_PLAYERS = [new Player(), new AIPlayer()];

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [players, SetPlayers] = React.useState<Player[]>(GAME_PLAYERS);
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [playerCard, setPlayerCard] = React.useState<Card | null>(null);
  const [leader, setleader] = React.useState<leader>("Player 1");

  // ###################################################################
  // =================  Callback Functions:  ===========================
  // ###################################################################
  function newRound() {
    setGamePhase("Draw");
    setRound(round + 1);
    setleader(leader === "Player 1" ? "Player 2" : "Player 1");
  }

  function onCardSelected(card: Card) {
    setPlayerCard(card);
    card.playCard();
    setGamePhase("Results");
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
    players[0].makeHand();
    players[1].makeHand();
    setGamePhase("Game");
    return null;
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>My Hand: {renderHand()}</div>
    );
  }

  function renderResults() {
    return <div>results:</div>;
  }

  // ###################################################################
  // =================  Render Subcomponents:  =========================
  // ###################################################################

  function renderHand() {
    return (
      <div className={cardCSS.hand_container}>
        <ul>
          {players[0].hand.map((card) => (
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

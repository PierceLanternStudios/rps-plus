import React from "react";
import "./App.css";
import { Move, moves } from "./Move";
import Player from "./Player";
import gamePhaseCSS from "./gamePhase.module.css";
import cardCSS from "./card.module.css";

type GamePhase = "pre-Game" | "Draw" | "Game" | "Shop";

function getRandomMove(): Move {
  return moves[Math.floor(3 * Math.random())];
}

function App() {
  // Declare State:
  const [player, SetPlayer] = React.useState<Player>(new Player());
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);

  // new round
  function newRound() {
    setGamePhase("Draw");
    setRound(round + 1);
  }

  // render pregame screen:
  function renderPreGame() {
    return <button onClick={newRound}>Begin Game</button>;
  }

  // render draw phase, in case I want to do any draw animations or anything:
  function renderDrawPhase() {
    player.makeHand();
    setGamePhase("Game");
    return null;
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>My Hand: {renderHand()}</div>
    );
  }

  function renderHand() {
    return (
      <div className={cardCSS.hand_container}>
        <ul>
          {player.hand.map((elem) => (
            <button className={cardCSS.button}>{elem.DEBUG_toString()}</button>
          ))}
        </ul>
      </div>
    );
  }
  //determine what to do based on the phase of the game:
  switch (gamePhase) {
    case "pre-Game":
      return renderPreGame();

    case "Draw":
      return renderDrawPhase();
    case "Game":
      return renderGamePhase();
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

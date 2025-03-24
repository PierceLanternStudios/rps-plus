import React from "react";
import "./App.css";
import { Move, moves } from "./Move";
import Player from "./Player";

function getRandomMove(): Move {
  return moves[Math.floor(3 * Math.random())];
}

function App() {
  const [computerMove, setComputerMove] = React.useState(getRandomMove());
  const [player, SetPlayer] = React.useState(new Player());
  return (
    <div>
      Computer Move: {computerMove} Player Hand: {player.DEBUG_printHand()}
    </div>
  );
}

export default App;

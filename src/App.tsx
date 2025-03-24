import React from "react";
import "./App.css";
import { Move, moves } from "./Move";

function getRandomMove(): Move {
  return moves[Math.floor(3 * Math.random())];
}

function App() {
  const [computerMove, setComputerMove] = React.useState(getRandomMove());
  return <div>Computer Move: {computerMove}</div>;
}

export default App;

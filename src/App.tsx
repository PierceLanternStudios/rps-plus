import React from "react";
import "./App.css";

type Move = "rock" | "paper" | "scissors";
const moves: readonly Move[] = ["rock", "paper", "scissors"];

function getRandomMove(): Move {
  return moves[Math.floor(3 * Math.random())];
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());
  return <div>Computer Move: {computerMove}</div>;
}

export default App;

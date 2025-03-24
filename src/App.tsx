import React from "react";
import "./App.css";

type Move = "rock" | "paper" | "scissors";
const moves: readonly Move[] = ["rock", "paper", "scissors"];

function GetRandomMove(): Move {
  return moves[Math.floor(3 * Math.random())];
}

function App() {
  return <div>Computer Move: {GetRandomMove()}</div>;
}

export default App;

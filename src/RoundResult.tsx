import Player from "./Player";
import { Move } from "./Move";

type Winner = "Player 1" | "Player 2" | "Draw";

/*
RoundResult Class

This class is used to store the result of a single Gameplay round. This object
will get passed through a RoundModifier pipeline by the player to affect the 
results. This contains all the data on how a round goes, including who played
what and who the resulting winner should be. 
*/
class RoundResult {
  p1Move: Move;
  p2Move: Move;
  money: Number;
  winner: Winner = "Draw"; // this will get updated in the constructor

  constructor(p1Move: Move, p2Move: Move, money: number = 100) {
    this.p1Move = p1Move;
    this.p2Move = p2Move;
    this.money = money;

    this.solveWinner();
  }

  // ugly function to decide who wins. There's definitely a neater way to do this
  // using indices of an array and the % operator, but for the time being this
  // will work and I'm going to implement that part later.
  solveWinner() {
    if (this.p1Move === this.p2Move) this.winner = "Draw";
    else if (this.p1Move === "scissors")
      this.winner = this.p2Move === "rock" ? "Player 2" : "Player 1";
    else if (this.p1Move === "rock")
      this.winner = this.p2Move === "paper" ? "Player 2" : "Player 1";
    else this.winner = this.p2Move === "scissors" ? "Player 2" : "Player 1";
  }
}

export default RoundResult;

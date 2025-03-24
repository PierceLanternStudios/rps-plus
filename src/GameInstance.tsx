import Player from "./Player";

type GamePhase = "pre-Game" | "Draw" | "Game" | "Shop";

class GameInstance {
  Players: Player[];
  Round: number;
  gamePhase: GamePhase;

  constructor() {
    this.Players = [new Player(), new Player()];
    this.Round = 0;
    this.gamePhase = "pre-Game";
  }
}

export default GameInstance;

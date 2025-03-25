import React from "react";
import { Move } from "./Move";
import Player from "./Player";

class Card {
  constructor(public cardType: Move, public owningPlayer: Player) {}

  /**
   * Name:          playCard
   * Description:   Called to play this card into the current round. Will
   *                change the game into results.
   * Arguments:     none
   * Returns:       none
   * Effects:       Removes this card from the players hand.
   */
  playCard() {
    this.owningPlayer.removeCard(this);
  }

  /**
   * Name:          DEBUG_toString
   * Description:   returns the string name of this card, for printing/debugging.
   * Arguments:     none
   * Returns:       a string representing the name of the Card, for example "rock".
   * Effects:       none
   */
  DEBUG_toString(): string {
    return String(this.cardType);
  }
}

export default Card;

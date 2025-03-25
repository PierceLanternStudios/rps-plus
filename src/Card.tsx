import React from "react";
import { type Move, MOVES } from "./Move";
import Player from "./Player";

class Card {
  constructor(public cardType: Move) {}

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

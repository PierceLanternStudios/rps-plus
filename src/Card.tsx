import React from "react";
import { Move } from "./Move";

class Card {
  cardType: Move;

  constructor(cardType: Move) {
    this.cardType = cardType;
  }

  DEBUG_toString() {
    return String(this.cardType);
  }
}

export default Card;

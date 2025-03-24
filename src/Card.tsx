import React from "react";
import { Move } from "./Move";

class Card {
  cardType: Move;

  constructor(cardType: Move) {
    this.cardType = cardType;
  }
}

export default Card;

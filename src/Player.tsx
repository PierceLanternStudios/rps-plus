import React from "react";
import Card from "./Card";
import RoundResult from "./RoundResult";
import { Move, moves } from "./Move";

type Hand = Card[];
type HandModifier = (input: Hand) => Hand;
type RoundModifier = (input: RoundResult) => RoundResult;

/*
Player Class

This is the base class for a player. This contains a Players hand, and their
respective modifier pipelines for both drawing their hand and playing out 
rounds.
*/
class Player {
  hand: Hand;
  money: Number;
  handPipeline: HandModifier[];

  /**
   * Function:      constructor
   * Description:   Called at the creation of a new player object. Sets all
   *                values to default.
   * Parameters:    None
   * Returns:       void
   * Effects:       Creates a new player object, and spawns them a starting
   *                hand.
   */
  constructor() {
    this.hand = this.makeHand();
    this.money = 0;
    this.handPipeline = [];
  }

  /**
   * Function:      makeHand
   * Description:   Header function to initialize creation of a hand object.
   *                Creates the default hand and then calls the pipeline.
   * Parameters:    None
   * Returns:       a new hand object for the player.
   * Effects:       Removes the old hand data and replaces it with a new hand.
   */
  makeHand(): Hand {
    const hand = [new Card("rock"), new Card("paper"), new Card("scissors")];
    return hand;
    return this.addHandModifiers(hand);
  }

  /**
   * Function:      addHandModifiers
   * Description:   Applies all modifiers from the handPipeline to the hand object
   *                in-place.
   * Parameters:    a hand object to modify
   * Returns:       the modified hand object
   * Effects:       Modifies the `hand` property of the `Player` instance by applying
   *                each function in the `handPipeline` array to it.
   */
  addHandModifiers(hand: Hand): Hand {
    for (const fn of this.handPipeline) {
      hand = fn(hand);
    }
    return hand;
  }

  DEBUG_printHand() {
    return this.hand.map((elem, idx) =>
      elem.DEBUG_toString().concat(idx === this.hand.length - 1 ? "" : ", ")
    );
  }
}

export default Player;

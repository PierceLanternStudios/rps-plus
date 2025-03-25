import Player from "./Player";
import Card from "./Card";

/**
 *      AIPlayer class
 *
 *      This is an extension of the Player class, with additional
 *      functionality for playing cards automatically. Namely,
 *      contains a function that allows for selecting a card from
 *      hand automatically.
 */
class AIPlayer extends Player {
  /**
   * Name:            selectCardToPlay
   * Description:     The core function of the AI player. A super
   *                  function over the base `playCard` that selects
   *                  a random card from hand and plays that one
   *                  automatically.
   * Arguments:       none
   * Returns:         none
   * Effects:         This will pick a random card from hand and play
   *                  it, which constitutes removing it from hand and
   *                  playing it into the `playedCard` slot.
   */
  playCard() {
    super.playCard(this.hand[Math.floor(Math.random() * this.hand.length)]);
  }
}

export default AIPlayer;

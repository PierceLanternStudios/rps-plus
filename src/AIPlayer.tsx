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
   * Description:     The core function of the AI player. Selects
   *                  A random card from their hand and returns it
   *                  to be played.
   * Arguments:       none
   * Returns:         A random card from the AI Player's hand.
   * Effects:         None. Note that this function does NOT play
   *                  the card, it simply selects a random one.
   */
  selectCardToPlay(): Card {
    return this.hand[Math.floor(Math.random() * this.hand.length)];
  }
}

export default AIPlayer;

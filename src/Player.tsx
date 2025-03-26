import Card from "./Card";
import { type Move, MOVES } from "./Move";

type Hand = Card[];
type HandModifier = (input: Hand) => Hand;

/**
 * Player Class
 *
 * This is the base class for a player. This contains a Players hand, and their
 * respective modifier pipelines for both drawing their hand and playing out
 * rounds.
 *
 */
class Player {
  /**
   * Function:      constructor
   * Description:   Called at the creation of a new player object. Sets all
   *                values to default.
   * Parameters:    None
   * Returns:       void
   * Effects:       Creates a new player object, and spawns them a starting
   *                hand.
   */
  constructor(
    public hand: Hand = [],
    public money: number = 0,
    public handPipeline: HandModifier[] = [],
    public playedCard: Card | null = null
  ) {}

  /**
   * Function:      makeHand
   * Description:   Header function to initialize creation of a hand object.
   *                Creates the default hand and then calls the pipeline.
   * Parameters:    None
   * Returns:       a new hand object for the player.
   * Effects:       Removes the old hand data and replaces it with a new hand.
   */
  makeHand() {
    const hand = MOVES.map((move) => new Card(move));
    this.hand = this.addHandModifiers(hand);
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

  /**
   * Name:          playCard
   * Description:   Called to play a card into the current round. Will
   *                remove this card from hand, and place it into the
   *                "playedCard" slot.
   * Arguments:     A card to `play`
   * Returns:       none
   * Effects:       Removes this card from the players hand, and adds it
   *                to the playedCard slot.
   */
  playCard(card: Card) {
    this.playedCard = card;
    this.removeCard(card);
  }

  /**
   * Name:          removeCard
   * Description:   removes a specified card from the hand. If multiple are present,
   *                will remove the first occurence of this card.
   * Arguments:     a Card to delete from this players hand
   * Returns:       none
   * Effects:       Will remove the specified card from the hand.
   */
  removeCard(card: Card) {
    this.hand.splice(this.hand.indexOf(card), 1);
  }

  /**
   * DEBUG_printHand
   * A debug function that can be called to print the contents of a player's
   * hands as an array of strings.
   */
  DEBUG_printHand() {
    return this.hand.map((elem, idx) =>
      elem.DEBUG_toString().concat(idx === this.hand.length - 1 ? "" : ", ")
    );
  }
}

export default Player;

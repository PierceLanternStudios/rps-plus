/**
 * Name:            RoundModifier Class
 * Description:     Definition of A round modifier object. This is the basic
 *                  framework of all modifiers that the player can obtain.
 * Fields:
 *      name:       The name of the modifier
 *      cost:       The cost to purchase this modifier
 *      fn:         the function this modifier should perform.
 *
 * Notes:           Note that all modifiers will be instantiated inside the
 *                  primary App() function, so that the functions can take
 *                  advantage of the game state when making their
 *                  modifications.
 */

class RoundModifier {
  constructor(
    public name: string,
    public cost: number,
    public fn: () => void
  ) {}
}

export default RoundModifier;

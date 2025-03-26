import React from "react";
import { type Move, MOVES } from "./Move";
import Player from "./Player";
import AIPlayer from "./AIPlayer";
import gamePhaseCSS from "./gamePhase.module.css";
import ResultPhaseCSS from "./resultsPhase.module.css";
import cardCSS from "./card.module.css";
import RoundModifier from "./RoundModifier";
import Card from "./Card";

type GamePhase = "pre-Game" | "Draw" | "Game" | "Results" | "Shop";
type gamePlayer = "You" | "Computer";
type GameResult = gamePlayer | "Tie";

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [player, setPlayer] = React.useState<Player>(new Player());
  const [computer, setComputer] = React.useState<AIPlayer>(new AIPlayer());
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [resultsSolved, setResultsSolved] = React.useState<boolean>(false);
  const [roundPipeline, setRoundPipeline] = React.useState<RoundModifier[]>([]);

  // round-end parameters:
  const [roundMoney, setRoundMoney] = React.useState<number>(0);
  const [roundResult, setRoundResult] = React.useState<GameResult>("Tie");

  // non-state parameters from round ending:
  const [roundEffects, setRoundEffects] = React.useState<string[]>([]);

  const [MODIFIER_FUNCTIONS, SMF] = React.useState<RoundModifier[]>(
    GENERATE_MODIFIER_FUNCTIONS()
  );

  // ###################################################################
  // =================  Callback Functions:  ===========================
  // ###################################################################
  function newRound() {
    setGamePhase("Draw");
    setRound(round + 1);
  }

  function onCardSelected(card: Card) {
    player.playCard(card);
    computer.playCard();
    setResultsSolved(false);
    setGamePhase("Results");
  }

  // ###################################################################
  // =================  Solve Game Results:  ===========================
  // ###################################################################

  /**
   * name:          processResults
   * description:   Solves the result of a round, and updates state variables
   *                accordingly for display.
   * arguments:     none
   * returns:       none
   * effects:       will update round state variables for display.
   * notes:         This function uses the `!` operator a few times. This is
   *                guaranteed to be safe, as the playerCard and computerCard
   *                state are guaranteedly set to a non-null card before this
   *                function is called. In fact, the only time those variables
   *                are ever null is when they are first declared, and are
   *                then assigned at the beginning of the first round.
   */
  function processResults() {
    // check if we've already computed this render:
    if (resultsSolved) return;

    console.log("Processing Results...");
    // determine who would win this round:
    if (player.playedCard!.cardType === computer.playedCard!.cardType) {
      setRoundResult("Tie");
    } else {
      setRoundResult(
        MOVES.indexOf(player.playedCard!.cardType) ===
          (MOVES.indexOf(computer.playedCard!.cardType) + 1) % 3
          ? "Computer"
          : "You"
      );
    }

    //perform round-end pipeline effects:
    for (const mod of roundPipeline) {
      mod.fn();
      console.log(roundPipeline.length);
    }

    // mark this as solved:
    setResultsSolved(true);
  }

  // ###################################################################
  // =================  Render Game Phases:  ===========================
  // ###################################################################

  // render pregame screen:
  function renderPreGame() {
    return <button onClick={newRound}>Begin Game</button>;
  }

  // render draw phase, in case I want to do any draw animations or anything:
  function renderDrawPhase() {
    player.makeHand();
    computer.makeHand();
    setGamePhase("Game");
    return <div>draw!</div>;
  }

  function renderGamePhase() {
    return (
      <div className={gamePhaseCSS.container}>My Hand: {renderHand()}</div>
    );
  }

  function renderResults() {
    processResults();
    return (
      <div className={ResultPhaseCSS.container}>
        <span>Round #{round}:</span>
        <span>Computer Played: {computer.playedCard!.DEBUG_toString()}</span>
        <span>You Played: {player.playedCard!.DEBUG_toString()}</span>
        <span>Round Effects: {renderRoundEffects()}</span>
        <span>Round Winner: {roundResult}!</span>
        <span>
          <button onClick={newRound}>New Round!</button>
          <button onClick={generateShop}>Go To Shop!</button>
        </span>
      </div>
    );
  }

  // ###################################################################
  // =================  Render Subcomponents:  =========================
  // ###################################################################

  function renderHand() {
    return (
      <div className={cardCSS.hand_container}>
        <ul>
          {player.hand.map((card) => (
            <button
              className={cardCSS.button}
              onClick={() => onCardSelected(card)}
            >
              {card.DEBUG_toString()}
            </button>
          ))}
        </ul>
      </div>
    );
  }

  function renderRoundEffects() {
    return (
      <div>
        <ul>
          {roundEffects.map((elem) => (
            <li>{elem}</li>
          ))}
        </ul>
      </div>
    );
  }
  function generateShop() {}

  // ###################################################################
  // ======================  Main Loop:  ===============================
  // ###################################################################
  //determine what to do based on the phase of the game:
  switch (gamePhase) {
    case "pre-Game":
      console.log("PREGAME");
      return renderPreGame();

    case "Draw":
      return renderDrawPhase();
    case "Game":
      return renderGamePhase();
    case "Results":
      return renderResults();
    case "Shop":
      return <div>SHOP!</div>;
  }

  // ###################################################################
  // ===============  Modifier Function Definitions:  ==================
  // ###################################################################

  function GENERATE_MODIFIER_FUNCTIONS(): RoundModifier[] {
    return [
      new RoundModifier("TestFunction", 100, () => {
        setRound(100);
        roundEffects.push("Set round to 100");
      }),
    ];
  }
}

export default App;

import React from "react";
import { type Move, MOVES } from "./Move";
import gameCSS from "./game.module.css";
import buttonCSS from "./button.main.module.css";
import splashCSS from "./splash.module.css";
import checkbox from "./checkbox";

type GamePhase = "pre-Game" | "Game" | "Results";
type gamePlayer = "You" | "Computer";
type GameResult = gamePlayer | "Tie";

const EMOJIS = { rock: " 🪨", paper: " 📃", scissors: " ✂️" };

/**
 * name:          App
 * description:   Main component for the Rock-Paper-Scissors game. Manages the
 *                game state, handles user interactions, and renders the
 *                appropriate UI based on the current game phase.
 * arguments:     none
 * returns:       JSX.Element - The rendered UI for the current game phase.
 * effects:       Manages state transitions and user interactions for the game.
 * notes:         The game consists of three phases: "pre-Game", "Game", and
 *                "Results". State variables are used to track the player's
 *                move, computer's move, the current round, and the result of
 *                each round.
 */

function App() {
  // ###################################################################
  // =================  Declare State Vars:  ===========================
  // ###################################################################

  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("pre-Game");
  const [round, setRound] = React.useState(0);
  const [roundResult, setRoundResult] = React.useState<GameResult>("Tie");
  const [computerWins, setComputerWins] = React.useState<number>(0);
  const [playerWins, setPlayerWins] = React.useState<number>(0);
  const [ties, setTies] = React.useState<number>(0);
  const [useEmojis, setUseEmojis] = React.useState<boolean>(false);

  // ###################################################################
  // =================  Callback Functions:  ===========================
  // ###################################################################
  function newRound() {
    setGamePhase("Game");
    setRound(round + 1);
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
  function processResults(player: Move, computer: Move) {
    // determine who would win this round:
    const winner = getWinner(player, computer);
    setRoundResult(winner);

    // keep track of stats:
    switch (winner) {
      case "You":
        setPlayerWins(playerWins + 1);
        break;
      case "Computer":
        setComputerWins(computerWins + 1);
        break;
      case "Tie":
        setTies(ties + 1);
        break;
    }

    // display results:
    setGamePhase("Results");
  }

  function getWinner(player: Move, computer: Move): GameResult {
    if (player === computer) {
      return "Tie";
    } else {
      return MOVES.indexOf(player!) === (MOVES.indexOf(computer!) + 1) % 3
        ? "Computer"
        : "You";
    }
  }

  /**
   * name:          onCardPlayed
   * description:   Handles the logic for when a player selects a card to play.
   *                This function determines the computer's move, updates the
   *                state variables for the player's and computer's moves, and
   *                processes the results of the round.
   * arguments:
   *    - cardName: Move - The move selected by the player.
   * returns:       none
   * effects:       Updates the state variables for playerMove, computerMove,
   *                and triggers the processResults function to determine the
   *                outcome of the round.
   * notes:         The computer's move is randomly selected from the MOVES array.
   */
  function onCardPlayed(cardName: Move) {
    const tempCompMove = MOVES[Math.floor(Math.random() * MOVES.length)];

    setPlayerMove(cardName);
    setComputerMove(tempCompMove);
    processResults(cardName, tempCompMove);
  }

  // ###################################################################
  // =================  Render Game Phases:  ===========================
  // ###################################################################

  function renderPreGame() {
    return (
      <div className={splashCSS.container}>
        <div className={gameCSS.hand_container}>
          <span>
            <h1>Rock, Paper, Scissors!</h1>
          </span>
          <div className={gameCSS.results_container}>
            <button onClick={newRound} className={buttonCSS.button}>
              Begin Game
            </button>
            <span>
              Use Emojis: {checkbox(useEmojis, () => setUseEmojis(!useEmojis))}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderGamePhase() {
    return (
      <div className={gameCSS.container}>
        <h2>Play a Card!</h2> {renderHand()}
      </div>
    );
  }

  function renderResults() {
    return (
      <div className={gameCSS.container}>
        <h3>Round #{round}:</h3>
        <div className={gameCSS.results_container}>
          <span>
            Computer Played <strong>{renderEmojis(computerMove!)}</strong>, You
            Played: <strong>{renderEmojis(playerMove!)}</strong>, Round Winner:{" "}
            <strong
              style={{
                fontSize: "large",
                color:
                  roundResult === "Tie"
                    ? "black"
                    : roundResult === "You"
                    ? "#00FF00"
                    : "#FF0000",
                textShadow:
                  roundResult === "Tie"
                    ? "0px 0px 5px black"
                    : roundResult === "You"
                    ? "0px 0px 5px #00FF00"
                    : "0px 0px 5px #FF0000",
              }}
            >
              {roundResult}!
            </strong>
          </span>
          <span>
            Stats:{" "}
            <b>
              {pluralize("win", playerWins)} / {pluralize("loss", computerWins)}{" "}
              / {pluralize("tie", ties)}
            </b>
          </span>
          <span>
            <button onClick={newRound} className={buttonCSS.button}>
              New Round!
            </button>
          </span>
        </div>
      </div>
    );
  }

  // ###################################################################
  // =================  Render Subcomponents:  =========================
  // ###################################################################

  function renderHand() {
    return (
      <div className={gameCSS.hand_container}>
        {MOVES.map((move) => renderCard(move))}
      </div>
    );
  }

  function renderCard(cardName: Move) {
    return (
      <button
        className={buttonCSS.button}
        onClick={() => onCardPlayed(cardName)}
      >
        {renderEmojis(cardName)}
      </button>
    );
  }

  // ###################################################################
  // =================  Text Formatting Utilities:  ====================
  // ###################################################################

  // function to take an input and a string and a number of those "things",
  // and return a (potentially) pluralized version of that string. Useful
  // if you have, for example 5 : egg and you want to return the string "5 eggs"
  function pluralize(input: string, occurences: number) {
    return occurences === 1
      ? occurences.toString() + " " + input
      : input.at(-1) === "s"
      ? occurences.toString() + " " + input + "es"
      : occurences.toString() + " " + input + "s";
  }

  // a function to add emojis to a specific Move string. Will only add
  // the emoji if the state variable "useEmojis" is set.
  function renderEmojis(cardName: Move) {
    return useEmojis ? cardName + EMOJIS[cardName] : cardName;
  }
  // ###################################################################
  // ======================  Main Loop:  ===============================
  // ###################################################################
  //determine what to do based on the phase of the game:
  switch (gamePhase) {
    case "pre-Game":
      return renderPreGame();
    case "Game":
      return renderGamePhase();
    case "Results":
      return renderResults();
  }
}

export default App;

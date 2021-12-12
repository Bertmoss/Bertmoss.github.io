//Arrays
//Score of the games played
const tiedGames = [];
const scoreUser = [];
const scoreComputer = [];
const gamesPlayed = [];
const currentGameArr = [];

//Computer quips
const playerLoseQuips = [
  "Sweet Victory!",
  "That was too easy!",
  "Winner, winner, chicken dinner!",
  "Have you gotten used to losing yet?",
  "Ha, I win!",
];
const playerWinQuips = [
  "Tis but a scratch.",
  "You got lucky!",
  "Welp, that's unexpected...",
  "I'll get you next time!",
  "I'm still far superior to you human!",
];
const playerTieQuips = [
  "I guess we're both losers.",
  "I guess we're both winners.",
  "I'm tie-red of ties.",
  "Great minds think alike!",
  "Stop copying me!",
];

//Functions
//Create random computer input
function getComputerInput() {
  const options = ["Rock", "Paper", "Scissors"];
  let randomNum = Math.floor(Math.random() * options.length);
  return options[randomNum];
}
//Compare user variable to computer variable, inform user of the result, add result to the score arrays.
function determineWinner(user, computer) {
  user = user.toUpperCase();
  computer = computer.toUpperCase();
  if (user === computer) {
    currentGameArr.push("It's a tie!");
    gamesPlayed.push(`${user.toLowerCase()} = ${computer.toLowerCase()}`);
    tiedGames.push(1);
    return "tie";
  } else if (
    (user === "ROCK" && computer === "SCISSORS") ||
    (user === "SCISSORS" && computer === "PAPER") ||
    (user === "PAPER" && computer === "ROCK")
  ) {
    currentGameArr.push("You win!");
    gamesPlayed.push(`${user.toLowerCase()} > ${computer.toLowerCase()}`);
    scoreUser.push(1);
    return "win";
  } else {
    currentGameArr.push("You lose!");
    gamesPlayed.push(`${user.toLowerCase()} < ${computer.toLowerCase()}`);
    scoreComputer.push(1);
    return "loss";
  }
}
//Create computer quip
function getComputerQuip(arr) {
  let randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
}
//Removes classes
function removeClass(elem, cls) {
  if (elem.classList.contains(cls)) {
    return elem.classList.remove(cls);
  }
}
//If not the first click reset animation
function resetAnimation(elem) {
  removeClass(elem, "victory");
  removeClass(elem, "defeat");
  return elem;
}

//DOM Manipulation
//Selectors
//Score
const wins = document.querySelector("#wins");
const losses = document.querySelector("#losses");
const ties = document.querySelector("#ties");
const rounds = document.querySelector("#rounds");
//Notifications
const currentGame = document.querySelector("#currentGame");
const previousGame = document.querySelector("#previousGame");
const previousRound = document.querySelector("#previousRound");
const previousGameTwo = document.querySelector("#previousGameTwo");
const previousRoundTwo = document.querySelector("#previousRoundTwo");
const theComputer = document.querySelector("#theComputer");
const quips = document.querySelector("#quips");
//Images
const playerImage = document.querySelector("#playerImage");
const computerImage = document.querySelector("#computerImage");
//Buttons
const buttons = document.querySelectorAll("button");
//Event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //Computer input value
    let pcInput = getComputerInput();
    //Background images for the player
    if (button.id === "paper") {
      playerImage.setAttribute(
        "style",
        "background-image: url(/images/paper.PNG)"
      );
    } else if (button.id === "rock") {
      playerImage.setAttribute(
        "style",
        "background-image: url(/images/rock.PNG)"
      );
    } else {
      playerImage.setAttribute(
        "style",
        "background-image: url(/images/scissors.PNG)"
      );
    }
    //Background images for the computer input
    if (pcInput === "Paper") {
      computerImage.setAttribute(
        "style",
        "background-image: url(/images/paper.PNG)"
      );
    } else if (pcInput === "Rock") {
      computerImage.style.cssText = "background-image: url(/images/rock.PNG)";
    } else {
      computerImage.style.cssText =
        "background-image: url(/images/scissors.PNG)";
    }
    //If not the first game removes previous classes for the border animation
    resetAnimation(playerImage);
    resetAnimation(computerImage);

    let result = determineWinner(button.id, pcInput);
    currentGame.textContent = `${currentGameArr[currentGameArr.length - 1]}`;
    previousRound.textContent = `Round ${gamesPlayed.length - 1}`;
    previousGame.textContent = `${gamesPlayed[gamesPlayed.length - 2]}`;
    previousRoundTwo.textContent = `Round ${gamesPlayed.length - 2}`;
    previousGameTwo.textContent = `${gamesPlayed[gamesPlayed.length - 3]}`;
    removeClass(theComputer, "hide");

    if (result === "win") {
      rounds.textContent = `Round: ${gamesPlayed.length}`; //update number of rounds
      wins.textContent = `Wins: ${scoreUser.length}`; // update wins
      quips.textContent = `${getComputerQuip(playerWinQuips)}`;
      playerImage.classList.toggle("victory");
      computerImage.classList.toggle("defeat");
      currentGame.setAttribute("style", "color: #69b844");
      if (gamesPlayed.length == 2) {
        removeClass(previousRound, "hide");
        removeClass(previousGame, "hide");
      } else if (gamesPlayed.length > 2) {
        removeClass(previousRoundTwo, "hide");
        removeClass(previousGameTwo, "hide");
      }
    } else if (result === "loss") {
      rounds.textContent = `Round: ${gamesPlayed.length}`;
      losses.textContent = `Losses: ${scoreComputer.length}`;
      quips.textContent = `${getComputerQuip(playerLoseQuips)}`;
      playerImage.classList.toggle("defeat");
      computerImage.classList.toggle("victory");
      currentGame.setAttribute("style", "color: #FA8928ff");
      if (gamesPlayed.length == 2) {
        removeClass(previousRound, "hide");
        removeClass(previousGame, "hide");
      } else if (gamesPlayed.length > 2) {
        removeClass(previousRoundTwo, "hide");
        removeClass(previousGameTwo, "hide");
      }
    } else {
      rounds.textContent = `Round: ${gamesPlayed.length}`;
      ties.textContent = `Ties: ${tiedGames.length}`;
      quips.textContent = `${getComputerQuip(playerTieQuips)}`;
      currentGame.setAttribute("style", "color: black");
      if (gamesPlayed.length == 2) {
        removeClass(previousRound, "hide");
        removeClass(previousGame, "hide");
      } else if (gamesPlayed.length > 2) {
        removeClass(previousRoundTwo, "hide");
        removeClass(previousGameTwo, "hide");
      }
    }
  });
});

// importing the Worlde words list 
import {Words} from "https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt"

// function to set up guessing
const totalGuesses = 6; 
let guessesRemaining = totalGuesses
let currentGuess = []
let nextLetter = 0
let correctGuessString = Words[Math.floor(Math.random() * Words.length)]
console.log(correctGuessString)

// function for the game board
function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i <totalGuesses; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
    for (let j = 0; j < 5; j++) {
        let box = document.createElement("div")
        box.className = "letter-box"
        row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()

// function for user input 
document.addEventListener("keypress", (event) => {
    if (guessesRemaining === 0) {
      return;
    }
  
    let pressedKey = String(event.key);
  
    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }
  
    if (pressedKey === "Enter") {
      checkGuess();
      return;
    };

    let randomLetter = currentWord.charAt(nextLetter); 

    if (pressedKey !== randomLetter) {
    return;
  }
  
    insertLetter(pressedKey);
})





let words = [];

if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  console.log(document.title);
  console.log(document.getElementById('wordle-container'));
}

function fetchDataFromFile() {
  return fetch('assets/words-list')
    .then(response => response.text())
    .then(data => {
      const dataArray = data.split('\n');
      return dataArray;
    })
    .catch(error => {
      console.error('Error fetching file:', error);
      return [];
    });
}

// Usage
fetchDataFromFile()
  .then(dataArray => {
    words = dataArray;
    console.log(words);
    // Continue with your code that depends on the words array
    initBoard();
  });

// function to set up guessing
const totalGuesses = 6; 
let guessesRemaining = totalGuesses
let currentGuess = []
let nextLetter = 0
let correctGuessString = words[Math.floor(Math.random() * words.length)]
console.log(correctGuessString)

// function for the game board
function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < 6; i++) {
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

// function for user key pressing and letter selecting
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

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}


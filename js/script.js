let words = [];

if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  console.log(document.title);
  console.log(document.getElementById('wordle-container'));
}

function fetchDataFromServer() {
  return fetch('')
    .then(response => response.text())
    .then(data => {
      const dataArray = data.split('\n');
      return dataArray;
    })
    .catch(error => {
      console.error('Error fetching data from server:', error);
      return [];
    });
}

// Usage
fetchDataFromServer()
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

    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }

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

function checkGuess () {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let guessString = ''
  let rightGuess = Array.from(rightGuessString)

  for (const val of currentGuess) {
      guessString += val
  }

  if (guessString.length != 5) {
      toastr.error("Not enough letters!")
      return
  }

  if (!WORDS.includes(guessString)) {
      toastr.error("Word not in list!")
      return
  }

  
  for (let i = 0; i < 5; i++) {
      let letterColor = ''
      let box = row.children[i]
      let letter = currentGuess[i]
      
      let letterPosition = rightGuess.indexOf(currentGuess[i])
      // is letter in the correct guess
      if (letterPosition === -1) {
          letterColor = 'grey'
      } else {
          // now, letter is definitely in word
          // if letter index and right guess index are the same
          // letter is in the right position 
          if (currentGuess[i] === rightGuess[i]) {
              // shade green 
              letterColor = 'green'
          } else {
              // shade box yellow
              letterColor = 'yellow'
          }

          rightGuess[letterPosition] = "#"
      }

      let delay = 250 * i
      setTimeout(()=> {
          //shade box
          box.style.backgroundColor = letterColor
          shadeKeyBoard(letter, letterColor)
      }, delay)
  }

  if (guessString === rightGuessString) {
      guessesRemaining = 0
      return
  } else {
      guessesRemaining -= 1;
      currentGuess = [];
      nextLetter = 0;
      }
  }
  
  document.addEventListener("keyup", (event) => {
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

    let randomLetter = correctGuessString.charAt(nextLetter); 

    if (pressedKey !== randomLetter) {
      return;
    }

    insertLetter(pressedKey);
});


initBoard()
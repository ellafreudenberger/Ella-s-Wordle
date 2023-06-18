// Words are fetched from the URL's list. Whitespace is trimmed and the list of words are converted into an array. 

const wordsListUrl = 'https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt';
let words = [];


if (typeof window !== 'undefined') {
    console.log('You are on the browswer')
    console.log(document.title)
    console.log(document.getElementById('wordle-container'))
}

async function fetchWordsFromWebsite() {
  try {
    const response = await fetch(wordsListUrl, {
      mode: 'cors', // set the mode to 'cors'
    });
    const text = await response.text();
    words = convertToWordArray(text); // assigns the fetched words to the global words variable
    console.log(words);
  } catch (error) {
    console.error('Error fetching words:', error);
  }
}

function convertToWordArray(words) {
  return words.trim().split('\n');
}

// calls fetchWordsFromWebsite to fetch the words
fetchWordsFromWebsite().then(() => {

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
})
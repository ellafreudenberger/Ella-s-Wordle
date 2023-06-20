// empty array of words to add fetched data to
let words = [];

//  checking code is running in a browser environment and logging title of the current document and wordle-container element
if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  console.log(document.title);
  console.log(document.getElementById('wordle-container'));
}

// fetching data from the local server created with node and turning it into an array: fetch() function initiates the HTTP request to the server and returns a promise that represents the asynchronous operation, .then() method is called on the returned promise to get the response from the server, response.text() method is called on the response object to resolve the response body as text, another .then() method is called on the promise returned by response.text to receive the data and ()split('\n') splits each word on a separate line into a string for the array, and .catch() handles any errors
function fetchDataFromServer() {
  return fetch('assets/words-list')
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

// returned dataArray is assigned to the words variable
fetchDataFromServer()
  .then(dataArray => {
    words = dataArray;
    console.log(words);

    // function to set up guessing: total guesses allowed, initial variable for guesses remaining, currentGuess is an empty array for user to add to, nextLetter is initialized with the value 0 to indicate the starting position/index of the next letter to be guessed, random number generated by Math.random() is multiplied by the length of the words array and the words.length represents the number of elements in the words array, Math.floor() rounds down the resulting value to the nearest whole number so a word is chosen at that index
    const totalGuesses = 6;
    let guessesRemaining = totalGuesses;
    let currentGuess = [];
    let nextLetter = 0;
    let correctGuessString = words[Math.floor(Math.random() * words.length)];
    console.log(correctGuessString);


    // creating the game board with rows and boxes
    function initBoard() {
      let board = document.getElementById("game-board");

      for (let r = 0; r < 6; r++) {
        let row = document.createElement("div");
        row.className = "letter-row";

        for (let b = 0; b < 5; b++) {
          let box = document.createElement("div");
          box.className = "letter-box";
          row.appendChild(box);
        }

        board.appendChild(row);
      }
    }

    // keys.forEach loop checks if the text content of the current button (elem.textContent) matches the provided letter and if no conditions are met, the code sets the background color of the button to the provided color
    function colorKeyboardBox(letter, color) {
      const keys = document.querySelectorAll('.key');
      keys.forEach(elem => {
        if (elem.textContent === letter) {
          if (elem.style.backgroundColor === 'rgb(85, 125, 47)') {
            return;
          }
          if (elem.style.backgroundColor === 'rgb(240, 188, 98)' && color !== 'rgb(85, 125, 47)') {
            return;
          }
          elem.style.backgroundColor = color;
        }
      });
    }
    
    colorKeyboardBox ();

    // function clears the box text content, removes any visual indication that boxes were previously filled, removes the last element from the currentGuess array, and deletes previously entered letters
    function deleteLetter() {
      if (nextLetter <= 0) {
        return;
      }
    
      let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
      let box = row.children[nextLetter - 1];
      
      box.textContent = "";
      box.classList.remove("filled-box");
      currentGuess.splice(-1, 1);
      nextLetter -= 1;
    }

    // .join method makes the currentGuess a string, correctGuessString is converted into an array of selected letters, function iterates over letters of the user's guess and compares them with the letters in correct guess, letters in correct position become green, correct letters in wrong positions become yellow, null determines if the letter has already been matched, loop terminated when i=5 or j=5
    function checkGuess() {
      const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
      const guessString = currentGuess.join("");
      const rightGuess = Array.from(correctGuessString);
      const letterColor = Array(5).fill("rgb(170, 85, 70)");
    
      if (guessString.length !== 5) {
        return;
      }
    
      for (let i = 0; i < 5; i++) {
        if (rightGuess[i] === currentGuess[i]) {
          letterColor[i] = "rgb(85, 125, 47)";
          rightGuess[i] = "null";
        } else
          for (let j = 0; j < 5; j++)
            if (rightGuess[j] === currentGuess[i] && letterColor[j] !== "rgb(85, 125, 47)") {
              letterColor[i] = "rgb(240, 188, 98)";
              rightGuess[j] = "null";
              break;
            }
      }
    
      for (let i = 0; i < 5; i++) {
        let box = row.children[i];
        let delay = 250 * i;

        // delays this animation to change backgroundColor of box in accordance with the value guessed at the index of the letterColor array
        setTimeout(() => {
          box.style.backgroundColor = letterColor[i];
          colorKeyboardBox(guessString.charAt(i), letterColor[i]);
        }, delay);
      }
      
      // checks if the guessString variable is equal to the correctGuessString variable, and if this is true, then no more guesses are needed
      if (guessString === correctGuessString) {
        guessesRemaining = 0;
        return;
      }
    
      guessesRemaining--;
      currentGuess = [];
      nextLetter = 0;
    }
    
    // only 5 letters can be entered, determine the row index, the value of nextLetter and column index for placement, .children is used to select a specific child element based on the index provided by nextLetter
    function insertLetter(pressedKey) {
      if (nextLetter >= 5) return;
    
      const box = document.getElementsByClassName("letter-row")[6 - guessesRemaining].children[nextLetter];
      
    //adds css styling to box element
      box.textContent = pressedKey;
      box.classList.add("filled-box");
      
      currentGuess.push(pressedKey);
      nextLetter++;
    }
    

    // keyup is for when the key is release the eventListener function follows for deleting letters, checking guesses and entering letters into the board
    document.addEventListener("keyup", (e) => {
      if (guessesRemaining === 0) {
        return;
      }

      let pressedKey = String(e.key);
      if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
      }

      if (pressedKey === "Enter") {
        checkGuess();
        return;
      }

    //&& means true only if both expressions are true
      if (pressedKey.match(/[a-z]/gi) && pressedKey.length === 1) {
        insertLetter(pressedKey);
      }  
    });

    //target element of the click event is assigned to target
    document.getElementById("key-board").addEventListener("click", (e) => {
      const target = e.target;


    //checks for which will have css styling applied
      if (!target.classList.contains("key")) {
        return;
      }

    //assigns text content of click event to key
      let key = target.textContent;

    //connects delete key with the action of backspace
      if (key === "Del") {
        key = "Backspace";
      }
    //keyup event triggered
      document.dispatchEvent(new KeyboardEvent("keyup", { key }));
    });

    initBoard();
  });


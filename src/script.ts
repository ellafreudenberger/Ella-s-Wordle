// empty array of words to add fetched data to
let words: Array<string> = [];

//  checking code is running in a browser environment and logging title of the current document and wordle-container element
if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  console.log(document.title);
  console.log(document.getElementById('wordle-container'));
}

// fetching data from the local server created with node and turning it into an array: fetch() function initiates the HTTP request to the server and returns a promise that represents the asynchronous operation, .then() method is called on the returned promise to get the response from the server, response.text() method is called on the response object to resolve the response body as text, another .then() method is called on the promise returned by response.text to receive the data and ()split('\n') splits each word on a separate line into a string for the array, and .catch() handles any errors
function fetchDataFromServer(): Promise<string[]> {
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


// returned dataArray is assigned to the words variable
fetchDataFromServer()
  .then((dataArray: string[]) => {
    words = dataArray;
    console.log(words);
    return dataArray; // Return the data if needed further down the promise chain
  })
  .catch(error => {
    console.error('Error fetching data from server:', error);
    return []; // Provide a default value or handle the error appropriately
  });


    // function to set up guessing: total guesses allowed, initial variable for guesses remaining, currentGuess is an empty array for user to add to, nextLetter is initialized with the value 0 to indicate the starting position/index of the next letter to be guessed, random number generated by Math.random() is multiplied by the length of the words array and the words.length represents the number of elements in the words array, Math.floor() rounds down the resulting value to the nearest whole number so a word is chosen at that index (2020, March 1). How to Build a Wordle Clone in JavaScript. Free Code Camp. https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/

    const totalGuesses: number = 6;
    let guessesRemaining: number = totalGuesses;
    let currentGuess: Array<string> = []; //let currentGuess: string[] = []; is another option
    let nextLetter = 0;
    let correctGuessString: string = words[Math.floor(Math.random() * words.length)];
    console.log(correctGuessString);


    // creating the game board with rows and boxes (2020, March 1). How to Build a Wordle Clone in JavaScript. Free Code Camp. https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/

    function initBoard(): void {
      const board = document.getElementById("game-board");
  
      if (board) {
          for (let r = 0; r < 6; r++) {
              const row = document.createElement("div");
              row.className = "letter-row";
  
              for (let b = 0; b < 5; b++) {
                  const box = document.createElement("div");
                  box.className = "letter-box";
                  row.appendChild(box);
              }
  
              board.appendChild(row);
          }
      } else {
          console.error("Game board element not found");
      }
  }  

    // keys.forEach loop checks if the text content of the current button (elem.textContent) matches the provided letter and if no conditions are met, the code sets the background color of the button to the provided color (2020, March 1). How to Build a Wordle Clone in JavaScript. Free Code Camp. https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/

    function colorKeyboardBox(letter: string, color: string): void {
      const keys = document.querySelectorAll('.key');
  
      keys.forEach((elem: Element) => {
          const htmlElement = elem as HTMLElement; // Cast to HTMLElement
          if (htmlElement.textContent === letter) {
              if (htmlElement.style.backgroundColor === 'rgb(85, 125, 47)') {
                  return;
              }
              if (htmlElement.style.backgroundColor === 'rgb(240, 188, 98)' && color !== 'rgb(85, 125, 47)') {
                  return;
              }
              htmlElement.style.backgroundColor = color;
          }
      });
  }
  
  colorKeyboardBox('A', 'rgb(85, 125, 47)');
  
    // function clears the box text content, removes any visual indication that boxes were previously filled, removes the last element from the currentGuess array, and deletes previously entered letters (2020, March 1). How to Build a Wordle Clone in JavaScript. Free Code Camp. https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/
    function deleteLetter(): void {
      if (nextLetter <= 0) {
          return;
      }
  
      const row = document.getElementsByClassName("letter-row")[6 - guessesRemaining] as HTMLDivElement;
      
      if (row) {
          const box = row.children[nextLetter - 1] as HTMLDivElement;
  
          if (box) {
              box.textContent = "";
              box.classList.remove("filled-box");
              currentGuess.splice(-1, 1);
              nextLetter -= 1;
          } else {
              console.error("Box not found");
          }
      } else {
          console.error("Row not found");
      }
  }
  
    // .join method makes the currentGuess a string, correctGuessString is converted into an array of selected letters, function iterates over letters of the user's guess and compares them with the letters in correct guess, letters in correct position become green, correct letters in wrong positions become yellow, null determines if the letter has already been matched, loop terminated when i=5 or j=5 (n.d.). Array.Prototype.Join(). Mozilla. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join; (2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).
    function checkGuess(): void {
      const row = document.getElementsByClassName('letter-row')[6 - guessesRemaining] as HTMLDivElement;
      const guessString: string = currentGuess.join("");
      const rightGuess: string[] = Array.from(correctGuessString);
      const letterColor: string[] = Array(5).fill("rgb(170, 85, 70)");
  
      if (guessString.length !== 5) {
          return;
      }
  
      for (let i = 0; i < 5; i++) {
          if (rightGuess[i] === currentGuess[i]) {
              letterColor[i] = "rgb(85, 125, 47)";
              rightGuess[i] = "null";
          } else {
              for (let j = 0; j < 5; j++) {
                  if (rightGuess[j] === currentGuess[i] && letterColor[j] !== "rgb(85, 125, 47)") {
                      letterColor[i] = "rgb(240, 188, 98)";
                      rightGuess[j] = "null";
                      break;
                  }
              }
          }
      }
  
      for (let i = 0; i < 5; i++) {
          const box = row.children[i] as HTMLDivElement;
          const delay = 250 * i;

        // delays this animation to change backgroundColor of box in accordance with the value guessed at the index of the letterColor array (n.d.). Java String charAt(). Java T Point. https://www.javatpoint.com/java-string-charat; (2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).
        
        for (let i = 0; i < 5; i++) {
          const box = row.children[i] as HTMLDivElement; // Declare 'box' using const
        
          const delay = 250 * i;
        
          setTimeout(() => {
            box.style.backgroundColor = letterColor[i];
            colorKeyboardBox(guessString.charAt(i), letterColor[i]);
          }, delay);
        }

      // checks if the guessString variable is equal to the correctGuessString variable, and if this is true, then no more guesses are needed (2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).
      if (guessString === correctGuessString) {
        guessesRemaining = 0;
        return;
      }
    
      guessesRemaining--;
      currentGuess = [];
      nextLetter = 0;
    }
  
    // only 5 letters can be entered, determine the row index, the value of nextLetter and column index for placement, .children is used to select a specific child element based on the index provided by nextLetter (2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).
    function insertLetter(pressedKey: string): void {
      if (nextLetter >= 5) return;
    
      const row = document.getElementsByClassName("letter-row")[6 - guessesRemaining] as HTMLDivElement;
    
      if (row) {
        const box = row.children[nextLetter] as HTMLDivElement;
    
        if (box) {
          box.textContent = pressedKey;
          box.classList.add("filled-box");
    
          currentGuess.push(pressedKey);
          nextLetter++;
    
          // Declare 'box' before setTimeout
          const delay = 250 * (nextLetter - 1); // Adjusted delay calculation
          setTimeout(() => {
            box.style.backgroundColor = letterColor[nextLetter - 1];
            colorKeyboardBox(guessString.charAt(nextLetter - 1), letterColor[nextLetter - 1]);
          }, delay);
    
          // adds CSS styling to box element
          box.textContent = pressedKey;
          box.classList.add("filled-box");
    
          currentGuess.push(pressedKey);
          nextLetter++;
        } else {
          console.error("Box not found");
        }
      } else {
        console.error("Row not found");
      }
    }
    
    
    // keyup is for when the key is release the eventListener function follows for deleting letters, checking guesses and entering letters into the board; added EventListener outlined below is from (2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).
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

    // target element of the click event is assigned to target
    const keyBoardElement = document.getElementById("key-board");

    if (keyBoardElement) {
      keyBoardElement.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
    
        // checks for which will have CSS styling applied
        if (!target.classList.contains("key")) {
          return;
        }
    
        // assigns text content of click event to key
        let key = target.textContent;
    
        // connects delete key with the action of backspace
        if (key === "Del") {
          key = "Backspace";
        }
    
        // keyup event triggered
        document.dispatchEvent(new KeyboardEvent("keyup", { key: key || '' }));

      });
    } else {
      console.error("Element with id 'key-board' not found");
    }
    
    // Assuming initBoard is a function defined elsewhere in your code
    initBoard();

//turn background music on and off with computer spacebar (n.d.). How to toggle audio play() pause() with one button or link? Stack Overflow. https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link
const audio = document.getElementById("music") as HTMLAudioElement;

function toggleMusic() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    toggleMusic();
  }
});
}}
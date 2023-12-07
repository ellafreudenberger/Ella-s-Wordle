# Ella's Wordle

Design is inspired by a virtual Scrabble board with the letter-boxes resembling tiles.

The words list used to generate random words for the user to guess is imported from https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt'. The words list is a text file that is converted to a local server using npm so that the words data can be fetched and turned into an array for functional use. 

User Directions: 
(Background music can be turned on and off with your computer spacebar) 

1. Guess the 5 letter word in 6 guesses. 
2. If a letter guessed results in a yellow tile, then the letter is in the wrong order of the right word answer. 
3. If a letter guessed results in a green tile, then the letter is in the correct order of the right word answer. 
4. If a letter guessed results in a red tile, then the letter is not in the right word answer. 
5. If all 5 letters guessed result in green tiles, then the right word has been guessed successfully. 

Tip: Do not waste a guess on the same word twice in 1 game or on a word that doesn’t exist in the Oxford English Dictionary. New functions will be implemented on the next game update to block these guesses and improve the user experience. 

Next update will include features for the game to be played on a touch screen phone. 

Technologies:

JavaScript, SASS, TypeScript and CSS

Coding Sources:

(2020, February 11). Z Index in CSS: What it Is and What it Does. Free Code Camp. https://www.freecodecamp.org/news/z-index-in-css-what-it-is-and-what-it-does/#:~:text=Z%20Index%20(%20z%2Dindex%20),%2C%20or%20position%3Afixed%20).

(2020, March 1). How to Build a Wordle Clone in JavaScript. Free Code Camp. https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/

(n.d.). Array.Prototype.Join(). Mozilla. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join

(n.d.). Java String charAt(). Java T Point. https://www.javatpoint.com/java-string-charat

(n.d.). How to toggle audio play() pause() with one button or link? Stack Overflow. https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link

Installation:

Make sure you have Node.js installed, then run:

```bash
npm install

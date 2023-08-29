import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Instructions () {
  return (
    <Alert variant="success">
      <Alert.Heading>Instructions </Alert.Heading>
      <p>
      Guess the 5 letter word in 6 guesses. If a letter guessed results in a yellow tile, then the letter is in the wrong order of the right word answer. If a letter guessed results in a green tile, then the letter is in the correct order of the right word answer. If a letter guessed results in a red tile, then the letter is not in the right word answer. If all 5 letters guessed result in green tiles, then the right word has been guessed successfully.
      </p>
      <hr />
      <p className="mb-0">
        Good luck!
      </p>
    </Alert>
  );
}

export default Instructions
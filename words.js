const wordsListUrl = 'https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt';
fetchWordsFromWebsite(wordsListUrl)
  .then(words => {
    const wordArray = convertToWordArray(words);
    console.log(wordArray);
  })
  .catch(error => {
    console.error('Error:', error);
  });

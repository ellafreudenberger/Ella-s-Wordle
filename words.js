const wordsListUrl = 'https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt';

async function fetchWordsFromWebsite() {
    const response = await fetch(wordsListUrl);
    const words = await response.text();
    const wordArray = convertToWordArray(words);
    console.log(wordArray);
  }

function convertToWordArray(words) {
    return words.trim().split('\n');
}

fetchWordsFromWebsite();

// Words are fetched from the URL's list. Whitespace is trimmed and the list of words are converted into an array. 

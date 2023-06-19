const express = require('express');
const app = express();

app.get('/words-list', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.sendFile('http://127.0.0.1:8080');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

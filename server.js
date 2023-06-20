const express = require('express');
const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/words-list', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.sendFile('http://127.0.0.1:8080', { root: __dirname }); // Assuming index.html is in the same directory as server.js
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

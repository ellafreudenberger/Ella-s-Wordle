const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the same directory as server.js
app.use(express.static(__dirname));

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

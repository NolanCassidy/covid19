// create express server for localhost and testing
const path = require('path');
const express = require('express');
const app = express();
// accessed at http://localhost:8080/
const port = 8080;

app.use(express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

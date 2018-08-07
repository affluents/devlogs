const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const saveLog = require('./logger.controller').saveLog;
const getLogs = require('./logger.controller').getLogs;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/log', (req, res) => {
  saveLog(req.body);
  res.send("Saved Successfully!");
});

app.get('/log', (req, res) => {
  getLogs((logs) => {
    res.send(logs);
  });
});

app.listen(3000, () => console.log('Logger listening on port 3000!'))
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'Devlogs';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    client.close();
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });

  }

const saveLog = require('./logger.controller').saveLog;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
    res.send("React-App");
});

app.post('/log', (req, res) => {
    saveLog(req.body);
    res.send("Saved Successfully!");
});

app.listen(3000, () => console.log('Logger listening on port 3000!'))
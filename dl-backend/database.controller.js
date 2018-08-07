const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'devlogs';
let db = null;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, _client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    db = _client.db(dbName);
});


function saveDoc(logObj) {
    const collection = db.collection('logs');
    collection.insert(logObj, (err, result) => {
        if (err)
            console.error(err);
        else
            console.log('Inserted successfully', result);
    })
}

const getDocs = function(col, callback) {
    // Get the documents collection
    const collection = db.collection(col);
    // Find some documents
    collection.find({}).toArray(function(err, logs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(logs);
      callback(logs);
    });
}

module.exports = {
    saveDoc: saveDoc,
    getDocs: getDocs
}
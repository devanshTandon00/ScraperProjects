const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();

// Connection URL
const url = process.env.MongoDB_URL;

//database name
const db = 'DB';

//use connect to connect to db
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const database = client.db(db);


    client.close();
  }

Module.exports = { mongoClient }

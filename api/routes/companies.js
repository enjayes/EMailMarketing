var express = require('express');
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'jobfinder';

const findDocuments = function (collectionObject, callback) {
    collectionObject.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        jobs = docs

        callback(docs);
    });
}




MongoClient.connect(url)
    .then(client => {
        console.log("COMPANIES CLIENT CONNECTED")
        const db = client.db(dbName);
        
        const usersCollection = db.collection("users");
        const tokenCollection = db.collection("tokens");
        var companiesCollection = db.collection("companies");


        function getUser(token, callback) {
            if (token && token != "undefined") {
                tokenCollection.findOne({ _id: token },
                    function (err, tokenUser) {
                        if (err || !tokenUser) {
                            callback()
                        }
                        else {
                            callback(tokenUser)
                        }
                    })
            }
            else {
                callback()
            }
        }
        



        /* GET users listing. */
        router.get('/get', function (req, res, next) {

            getUser(req.query.token, function (token) {
                let jobCollection = {}
                if (token) {
                   
                    findDocuments(companiesCollection, function (companies) {

                        res.send(JSON.stringify(companies));

                    });
                }
                else{
                    res.send(JSON.stringify([]));
                }
            })



        });

    }).catch(error => console.error(error))

module.exports = router;
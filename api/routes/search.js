var express = require('express');
var router = express.Router();
var fs = require('fs');
var sanitize = require("sanitize-filename");
const SHA224 = require("sha224");


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

var spawn = require('child_process').spawn;

var settings = {}


const findDocuments = function (collectionObject, callback) {
    collectionObject.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        jobs = docs

        callback(docs);
    });
}


var scraperRunning = {}


MongoClient.connect(url)
    .then(client => {

        
     
        const dbName = 'jobfinder';
        const db = client.db(dbName);
        const usersCollection = db.collection("users");
        const tokenCollection = db.collection("tokens");

        const settingsCollection = db.collection('settings');

        const searchCollection = db.collection('search');
        
    
        findDocuments(settingsCollection, function (settingsList) {
          settings = settingsList[0]
        })


        function startUserSearch(user,params){
            if(params.keywords.length > 0){
                searchCollection.insertOne(params)

                /*

                var prc = spawn("python",  [settings.scraper+"scraper\\runner.py",user.username,user.collections],{cwd:settings.scraper,shell :true});

                //noinspection JSUnresolvedFunction
              
                prc.stdout.setEncoding('utf8');
                prc.stdout.on('data', function (data) {
                    console.log("stdout: "+data.toString());
                });
                
                prc.stderr.on('data', function (data) {
                    console.log("stderr: "+data.toString());
                });

                prc.on('close', function (code) {
                    console.log('process exit code ' + code);
                });
                */
            }
        }



        function updateSearch(user, searchID, update) {
            var params = { username: user.username, collections: user.collections, keywords: [] }

            for (i = 0; i < user.searches.length; i++) {
                var item = user.searches[i]
                if(item.update){
                    params.keywords.push(item.keywords)
                    item.searchDate = Date.now()
                    item.update = false
                }
                else if (searchID) {
                    if (item.id == searchID) {
                        params.keywords.push(item.keywords)
                        
                        item.searchDate = Date.now()
                        item.update = false
                    }
                }
                else if (update) {
                    if (!item.searchDate) {
                        
                        params.keywords.push(item.keywords)
              
                        item.searchDate = Date.now()
                        item.update = false
                    } else if ((new Date(item.searchDate).toLocaleDateString()) != (new Date(Date.now()).toLocaleDateString())) {
                        
                        params.keywords.push(item.keywords)
                       
                        item.searchDate = Date.now()
                        item.update = false
                    }
                }
                else {
                    if (!item.searchDate) {
                        params.keywords.push(item.keywords)
                        item.searchDate = Date.now()
                        item.update = false
                    }
                }
            }
            if(params.keywords.length > 0){
                user.searching = true
                usersCollection.replaceOne({ _id: user.username }, user, { upsert: true })
                startUserSearch(user,params)
            }
            else{
                usersCollection.replaceOne({ _id: user.username }, user, { upsert: true })
            }
            return user.searches
    
        }




        router.get('/start', function (req, res, next) {
            console.log("/start")
            console.log(req.query)
            if (req.query.token && req.query.token != "undefined" && req.query.searchID) {
                tokenCollection.findOne({ _id: req.query.token },
                    function (err, token) {
                        if (!err && token) {
                            usersCollection.findOne({ _id: token.username }, function (err, user) {
                                if (!err && user) {
                                    console.log("startSearch")
                                    console.log(JSON.stringify(user))
                                    console.log("")
                                    var resultSearch = updateSearch(user, req.query.searchID)
                                    res.send(resultSearch)
                                }
                            })
                        }
                    }
                )
            }


        })

        router.post('/save', function (req, res, next) {
            console.log("/save")
            if (req.query.token && req.query.token != "undefined" && req.body.searches) {
                tokenCollection.findOne({ _id: req.query.token },
                    function (err, token) {
                        if (!err && token) {
                            usersCollection.findOne({ _id: token.username }, function (err, user) {
                                if (!err && user) {

                                    //user aus searches austragen

                                    user.searches = req.body.searches


                                    //user in searches eintragen

                                    console.log("startSearch")
                                    console.log(JSON.stringify(user))
                                    console.log("")
                                    var resultSearch = updateSearch(user)
                                    res.send(resultSearch)
  
                                }
                            })
                        }
                    }
                )
            }
        })


        router.get('/keywords', function (req, res, next) {
            if (req.query.token && req.query.token != "undefined" && req.query.keywordsType) {
                tokenCollection.findOne({ _id: req.query.token },
                    function (err, token) {
                        if (!err && token) {
                            usersCollection.findOne({ _id: token.username }, function (err, user) {
                                if (!err && user) {
                                    if(!user.keywords){
                                        user.keywords = {}
                                    }
                                    console.log("["+req.query.keywordsType+"]: "+req.query.value)
                                    user.keywords[req.query.keywordsType] = req.query.value
                                    usersCollection.replaceOne({ _id: user.username }, user, { upsert: true })
                                }
                            })
                        }
                    }
                )
            }
        })

        router.get('/category', function (req, res, next) {
            if (req.query.token && req.query.token != "undefined" && req.query.category) {
                tokenCollection.findOne({ _id: req.query.token },
                    function (err, token) {
                        if (!err && token) {
                            usersCollection.findOne({ _id: token.username }, function (err, user) {
                                if (!err && user) {
                                    if(!user.categories){
                                        user.categories = {}
                                    }
                                    var value = false
                                    if(req.query.value=="true"){
                                        value = true
                                    }
                                    user.categories[req.query.category] = value
                                    usersCollection.replaceOne({ _id: user.username }, user, { upsert: true })
                                }
                            })
                        }
                    }
                )
            }
        })


    }).catch(error => console.error(error))

module.exports = router;

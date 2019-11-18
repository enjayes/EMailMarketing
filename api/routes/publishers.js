var express = require('express');
var router = express.Router();
var fs = require('fs');
var sanitize = require("sanitize-filename");
const SHA224 = require("sha224");
const send = require('gmail-send')();

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

        
        
        const dbName = 'publishers';
        const db = client.db(dbName);
        const publishersCollection = db.collection("publishers");
    
    
        router.post('/send', function (req, res, next) {
            console.log("")
            console.log("Send Mail!")
            console.log(req.body)
            if(req.body.mailaddress){
                console.log("to: "+req.body.mailaddress.trim())
                console.log("subject: "+req.body.mailsubject.trim())
                console.log("text: "+req.body.mailtext.trim())
                send({
                    user: 'agiletaiga@gmail.com',
                    pass: 'hasenalarm',
                    html:    req.body.mailtext, 
                    to:    "nschmidbartl@gmx.de",//req.body.mailaddress,
                    subject: req.body.mailsubject
                }, (error, result, fullResult) => {
                    if (error) 
                        res.json({status:"error"});
                    else
                        res.json({status:"ok"});

                })
               
            }
            else{
                res.json({status:"error"});
            }
        })


        router.get('/get/items', function (req, res, next) {
         
            findDocuments(publishersCollection, function (publishers) {
            
                res.json(publishers);
            })


        })


        router.get('/get/template', function (req, res, next) {
         
            publishersCollection.findOne({ "_id": "template" },
                function (err, doc) {
                    if(!err && doc){
                        res.json({template:doc.template});
                    }
                    else{
                        res.json({template:""});
                    }
                }
            )


        })




        router.get('/update/:action/:id/', function (req, res, next) {
            console.log("update GET!")
            var action = req.params.action.toLowerCase().trim()
            console.log(action)
            console.log(req.params.id)
            
            publishersCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                   
                    if(doc && !err){
                        console.log("found")
            
                        if(action=="delete"){
                            doc.saved = false
                            doc.sent = false
                        }else if(action=="save"){
                            doc.saved = true
                        }else if(action=="send"){
                            doc.sent = true
                        }
                        console.log("insert: "+ req.params.id)
                        publishersCollection.replaceOne({ "_id": req.params.id }, doc)
                    }
                }
            )
            res.json({status:"ok"});


        })


        
        router.post('/update/:action/:id/', function (req, res, next) {
            console.log("update POST!")
            var action = req.params.action.toLowerCase().trim()

            
            console.log(action)
            console.log(req.body)

            if(action=="template"){
                publishersCollection.update({ "_id": "template" }, {"_id":"template","template":req.body.template},{ upsert: true })
            }else{
                publishersCollection.findOne({ "_id": req.params.id },
                    function (err, doc) {
                        if(doc && !err){
                            console.log("found")
                            if(action=="mails"){
                                doc.mails = req.body
                            }
                            else if(action=="publishercolor"){
                                doc.color = req.body.color
                                console.log("doc.color == "+req.body.color)

                            }
                        
                            console.log("insert: "+ req.params.id)
                            publishersCollection.replaceOne({ "_id": req.params.id }, doc)
                        }
                    }
                )
            }
            res.json({status:"ok"});
        })


       

      


    }).catch(error => console.error(error))

module.exports = router;

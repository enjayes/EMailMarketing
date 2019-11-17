var express = require('express');
var router = express.Router();
var fs = require('fs');
var sanitize = require("sanitize-filename");
const SHA224 = require("sha224");
const WebSocket = require('ws');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const findDocuments = function (collectionObject, callback) {
  collectionObject.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    jobs = docs
   
    callback(docs);
  });
}

function createCollectionSuffix(username){
  
}

function createTokenObject(token,username,collections){
  return {_id:token,token:token,username:username,date:Date.now(),collections:collections}
}




MongoClient.connect(url)
  .then(client => { 




   
    const wss = new WebSocket.Server({port: 5002});
    
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
    
      ws.send('something');
    });
    
    wss.on('listening',function(){
      console.log("websocket listening")
    })
    
    
    wss.on('error', function connection(error) {
      console.log("WEBSOCKET ERROR")
      console.log(error)
    })






    
    const dbName = 'jobfinder';
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const tokenCollection = db.collection("tokens");


    let session = {}

    var rand = function () {
      return Math.random().toString(36).substr(2); // remove `0.`
    };

    var createToken = function () {
      return rand() + rand(); // to make it longer
    };


    const createLoginData = (user,token) =>{

      var categories = user.categories
      if(!categories){
        categories = {}
      }
      var keywords = user.keywords
      if(!keywords){
        keywords = {}
      }

      return { loginError: "", registerError: "",keywords:keywords,categories:categories, searching:user.searching,username: user.username, loggedin: true, token: token.token,searches:user.searches }

    }


    /* GET users listing. */
    router.get('/init', function (req, res, next) {
      var sessionID = "s" + createToken()
      console.log("INIT SESSION")
      console.log("cookie token: ")
      console.log(req.query.token)
      if(req.query.token && req.query.token != "undefined"){
        tokenCollection.findOne({ _id:   req.query.token },
          function (err, token) {
            if (err || !token) {
              console.log("token error! ")
              console.log(err)
              res.send({ session: sessionID });
            }
            else{
              console.log("token found")
              usersCollection.findOne({ _id: token.username },
                function (err, user) {
                  if (!err && user) {
                    console.log("user found")
                    if(!user.searches){
                      user.searches = []
                    }
                    var loginData = createLoginData(user,token)
                    res.send({...loginData, session: sessionID });
                  }else{
                    res.send({ session: sessionID });
                  }
                })
            }
          })
        }
        else{
          console.log("no cookie token found! ")
          res.send({ session:sessionID });
        }
  
    });


    


    router.post('/login', function (req, res, next) {


      req.body.username = req.body.username.toLowerCase()

     

      usersCollection.findOne({ _id: req.body.username },
        function (err, user) {
          if (err) {
            res.send({ loginError: "Wrong Username or Password", registerError: "", username: "", loggedin: false, token: "" });
          } else if (user && user.password) {
            var requiredPassword = SHA224(user.password + SHA224(req.body.session + "_jobfinder").toString('hex')).toString('hex')
            if (requiredPassword == req.body.password) {
             
              if(!user.searches){
                user.searches = []
              }
              
              var token = createTokenObject(createToken(),user.username,user.collections)
              
              tokenCollection.replaceOne({_id:token.token},token,{upsert:true})
           
              console.dir(user)

      
              res.send(createLoginData(user,token));
            }
            else {
              res.send({ loginError: "Wrong Username or Password", registerError: "", username: "", loggedin: false, token: "",searches:[] });
            }
          }
          else {
            res.send({ loginError: "Wrong Username or Password", registerError: "", username: "", loggedin: false, token: "",searches:[] });
          }
        });


    });

    router.post('/register', function (req, res, next) {


      req.body.username = req.body.username.toLowerCase()


      if (req.body.username && req.body.password) {

        usersCollection.findOne({ _id: req.body.username },
          function (err, user) {
            if (err || !user) {
              var user = req.body
              user._id = user.username
              user.searches = []

              user.collections = SHA224(req.body.username).toString('hex')
              user.searching = false
              var token = createTokenObject(createToken(),req.body.username,user.collections) 

              tokenCollection.replaceOne({_id:token.token},token,{upsert:true})
           
              usersCollection.insertOne(user)

              var geoCollection = db.collection("geo." + token.collections)
              var geoSettings = {}
              geoSettings.geojson = [{ type: "FeatureCollection", features: Array(0) }]
              geoSettings.geoIndex = 0
              geoCollection.insertOne(geoSettings)


              res.send(createLoginData(user,token));
            }
            else {
              res.send({ loginError: "", registerError: "Username is already taken", username: "", loggedin: false, token: "",searches:[] });
            }
          }

        )

      }
    }
    );


    router.post('/logout', function (req, res, next) {

      tokenCollection.deleteOne({ _id: req.body.token })

      res.send({ token: true });
    });

  }).catch(error => console.error(error))

module.exports = router;

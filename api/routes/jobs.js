var express = require('express');
var router = express.Router();
var fs = require('fs');

var sanitize = require("sanitize-filename");



const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'jobfinder';

let settings = {}


const findDocuments = function (collectionObject, callback) {
  collectionObject.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    jobs = docs

    callback(docs);
  });
}



const prepareJobs = function (jobs) {

  jobs.forEach(function (job) {

  });

  return jobs
}




function createFolderName(company, jobtitle) {
  return sanitize(company + " - " + jobtitle)
}


function createJobFiles(job, dir) {
  var newCvFile = ""
  var newCoverLetterFile = ""
  var cvFile = ""
  var coverLetterFile = ""
  if (job.language && job.language == "de") {
    cvFile = settings.cvfolder + "Deutsch\\CV.docx"
    newCvFile = dir + "\\CV.docx"
    coverLetterFile = settings.cvfolder + "Deutsch\\Anschreiben.docx"
    newCoverLetterFile = dir + "\\Anschreiben.docx"
  } else {
    cvFile = settings.cvfolder + "Englisch\\CV.docx"
    newCvFile = dir + "\\CV.docx"
    coverLetterFile = settings.cvfolder + "Englisch\\Cover Letter.docx"
    newCoverLetterFile = dir + "\\Cover Letter.docx"
  }
  if (fs.existsSync(cvFile) && !fs.existsSync(newCvFile)) {
    fs.copyFile(cvFile, newCvFile, (err) => { })
  }
  if (fs.existsSync(coverLetterFile) && !fs.existsSync(newCoverLetterFile)) {
    fs.copyFile(coverLetterFile, newCoverLetterFile, (err) => { })
  }

}


function createJobFolder(job, open) {
  var foldername = createFolderName(job.company, job.jobtitle)
  var dir = settings.folder + foldername
  var backupdir = settings.folder + "Archiv\\" + foldername


  if (!fs.existsSync(dir)) {
    if (fs.existsSync(backupdir)) {
      fs.rename(backupdir, dir, (err) => {
        if (err) {
          console.log("ERROR: ")
          console.log(err)
        }
        else {
          createJobFiles(job, dir)
          if (open) {
            require('child_process').exec('start "" "' + dir + '"');
          }
        }

      });
    } else {
      fs.mkdirSync(dir);
      createJobFiles(job, dir)

      if (open) {
        require('child_process').exec('start "" "' + dir + '"');
      }
    }

  }

}


function backupJobFolder(job) {
  var foldername = createFolderName(job.company, job.jobtitle)
  var dir = settings.folder + foldername
  var newdir = settings.folder + "Archiv\\" + foldername

  if (fs.existsSync(dir) && !fs.existsSync(newdir)) {

    fs.rename(dir, newdir, (err) => {
      if (err) {
        console.log("ERROR: ")
        console.log(err)
      }

    });
  }
}






MongoClient.connect(url)
  .then(client => {

    console.log("JOBS CLIENT CONNECTED")

    const db = client.db(dbName);
   
    const settingsCollection = db.collection('settings');

    const tokenCollection = db.collection("tokens");

    findDocuments(settingsCollection, function (settingsList) {
      var settings = settingsList[0]
    })


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


    /* GET jobs listing. */
    router.get('/get/', function (req, res, next) {

      console.log("GET JOBS")
      console.log("query:")
      console.log(req.query)
      getUser(req.query.token, function (token) {
        let jobCollection = {}
        if (token) {
          console.log("Token found")
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)

          findDocuments(foundCollection, function (jobs) {
            console.log("foundCollection jobs." + token.collections+" found")
            jobCollection.found = prepareJobs(jobs)

            findDocuments(savedCollection, function (jobs) {
              console.log("foundCollection saved." + token.collections+" found")
              jobCollection.saved = prepareJobs(jobs)

              findDocuments(appliedCollection, function (jobs) {
                console.log("foundCollection applied." + token.collections+" found")
                jobCollection.applied = prepareJobs(jobs)

                findDocuments(deletedCollection, function (jobs) {
                  console.log("foundCollection deleted." + token.collections+" found")
                  jobCollection.deleted = prepareJobs(jobs)

                  res.send(JSON.stringify(jobCollection));


                });
              });
            });
          });
        }
        else {
          console.log("NO COLLECTIONS FOUND")
          jobCollection.found = []
          jobCollection.saved = []
          jobCollection.applied = []
          jobCollection.deleted = []
          res.send(JSON.stringify(jobCollection));
        }
      });



    });






    router.get('/delete/:id/:deleted/:deletedDate', function (req, res, next) {


      let deleted = true;
      if (req.params.deleted == "0") {
        deleted = false;
      }

      getUser(req.query.token, function (token) {
        if (token) {
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)

          try {
            if (deleted == true) {
              foundCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  if (doc) {
                    doc.deleted = true
                    doc.deletedDate = parseInt(req.params.deletedDate)
                    backupJobFolder(doc)
                    deletedCollection.insertOne(doc)
                    foundCollection.deleteOne({ "_id": req.params.id })
                  }

                  savedCollection.findOne({ "_id": req.params.id },
                    function (err, doc) {
                      if (doc) {
                        doc.deleted = true
                        doc.deletedDate = parseInt(req.params.deletedDate)
                        backupJobFolder(doc)
                        deletedCollection.insertOne(doc)
                        savedCollection.deleteOne({ "_id": req.params.id })
                      }

                      appliedCollection.findOne({ "_id": req.params.id },
                        function (err, doc) {
                          if (doc) {
                            doc.deleted = true
                            doc.deletedDate = parseInt(req.params.deletedDate)
                            backupJobFolder(doc)
                            deletedCollection.insertOne(doc)
                            appliedCollection.deleteOne({ "_id": req.params.id })
                          }


                        }
                      )

                    }
                  )
                }
              )

            }
            else {
              deletedCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  if (doc) {
                    doc.deleted = false
                    if (doc.applied) {
                      appliedCollection.insertOne(doc)
                    } else if (doc.saved) {
                      savedCollection.insertOne(doc)
                    }
                    else {
                      foundCollection.insertOne(doc)
                    }
                    deletedCollection.deleteOne({ "_id": req.params.id })
                  }

                }
              )

            }
          } catch (e) {
            console.log(e);
          }
        }
      })

      res.send('delete ' + req.params.id)
    });


    router.get('/rating/:id/:rating', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)

          foundCollection.updateOne({ "_id": req.params.id }, { $set: { "savedRating": parseFloat(req.params.rating) } })
          savedCollection.updateOne({ "_id": req.params.id }, { $set: { "savedRating": parseFloat(req.params.rating) } })
          appliedCollection.updateOne({ "_id": req.params.id }, { $set: { "savedRating": parseFloat(req.params.rating) } })
          deletedCollection.updateOne({ "_id": req.params.id }, { $set: { "savedRating": parseFloat(req.params.rating) } })
        }
      })

      res.send('rating ' + req.params.id)
    })



    router.get('/openfolder/:company/:jobtitle/:language', function (req, res, next) {
      var foldername = createFolderName(req.params.company, req.params.jobtitle)
      var dir = settings.folder + foldername
      if (fs.existsSync(dir)) {

        require('child_process').exec('start "" "' + dir + '"');
      }
      else {
        var job = { company: req.params.company, jobtitle: req.params.jobtitle, language: req.params.language }


        createJobFolder(job, true)

      }
      res.send('open ' + dir)
    })



    router.get('/save/:id/:saved/:savedDate', function (req, res, next) {


      

      let saved = true;
      if (req.params.saved == "0") {
        saved = false;
      }


      console.log("SAVE: "+saved)


      getUser(req.query.token, function (token) {
        if (token) {
          console.log("token:")
          console.log(token)
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)
          try {

            if (saved == true) {
              foundCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  console.log("foundCollection doc")
                  console.log(doc)
                  if (doc) {
                    doc.saved = true
                    if (!doc.notes) doc.notes = {}
                    doc.notes.lastEvent = parseInt(req.params.savedDate)

                    createJobFolder(doc, false)
                    savedCollection.insertOne(doc)
                    foundCollection.deleteOne({ "_id": req.params.id })
                  }

                  deletedCollection.findOne({ "_id": req.params.id },
                    function (err, doc) {
                      if (doc) {
                        doc.saved = true
                        if (!doc.notes) doc.notes = {}
                        doc.notes.lastEvent = parseInt(req.params.savedDate)
                        createJobFolder(doc, false)
                        savedCollection.insertOne(doc)
                        deletedCollection.deleteOne({ "_id": req.params.id })
                      }

                      appliedCollection.findOne({ "_id": req.params.id },
                        function (err, doc) {
                          if (doc) {
                            doc.saved = true
                            if (!doc.notes) doc.notes = {}
                            doc.notes.lastEvent = parseInt(req.params.savedDate)
                            createJobFolder(doc, false)
                            savedCollection.insertOne(doc)
                            appliedCollection.deleteOne({ "_id": req.params.id })
                          }



                        }
                      )

                    }
                  )
                }
              )

            }
            else {
              savedCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  if (doc) {
                    doc.saved = false
                    backupJobFolder(doc)
                    if (doc.deleted) {
                      deletedCollection.insertOne(doc)
                    } else if (doc.applied) {
                      appliedCollection.insertOne(doc)
                    }
                    else {
                      foundCollection.insertOne(doc)
                    }
                    savedCollection.deleteOne({ "_id": req.params.id })
                  }

                }
              )

            }
          } catch (e) {
            console.log(e);
          }
        }
      })



      res.send('save ' + req.params.id)
    });



    let replaceNotesValue = function (collection, req, callback) {
      return function (err, doc) {
        if (doc) {
          if (!doc.notes) {
            doc.notes = {}
          }
          if (req.body && req.body.noteValue) {
            doc.notes[req.params.name] = req.body.noteValue
          }
          else if (req.params.value) {
            doc.notes[req.params.name] = req.params.value
          }
          collection.replaceOne({ "_id": req.params.id }, doc)
        }
        if (callback)
          callback()
      }
    }


    const changeNoteFuntion = function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)
          foundCollection.findOne({ "_id": req.params.id }, replaceNotesValue(foundCollection, req, function () {
            savedCollection.findOne({ "_id": req.params.id }, replaceNotesValue(savedCollection, req, function () {
              appliedCollection.findOne({ "_id": req.params.id }, replaceNotesValue(appliedCollection, req, function () {
                deletedCollection.findOne({ "_id": req.params.id }, replaceNotesValue(deletedCollection, req, function () {

                }))
              }))
            }))
          }))
        }
      })

      res.send('change ' + req.params.id)
    }

    router.get('/change/:id/:name/:value', changeNoteFuntion)
    router.get('/change/:id/:name/', changeNoteFuntion)
    router.post('/change/:id/:name/:value', changeNoteFuntion)
    router.post('/change/:id/:name/', changeNoteFuntion)





    let replaceChecklistValue = function (collection, req, callback) {
      return function (err, doc) {
        if (doc) {
          if (!doc.notes) {
            doc.notes = {}
          }
          if (!doc.notes.checklist) {
            doc.notes.checklist = {}
          }

          doc.notes.checklist[req.body.name] = req.body.value

          collection.replaceOne({ "_id": req.params.id }, doc)
        }
        if (callback)
          callback()
      }
    }


    router.post('/checklist/:id/', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)
          foundCollection.findOne({ "_id": req.params.id }, replaceChecklistValue(foundCollection, req, function () {
            savedCollection.findOne({ "_id": req.params.id }, replaceChecklistValue(savedCollection, req, function () {
              appliedCollection.findOne({ "_id": req.params.id }, replaceChecklistValue(appliedCollection, req, function () {
                deletedCollection.findOne({ "_id": req.params.id }, replaceChecklistValue(deletedCollection, req, function () {

                }))
              }))
            }))
          }))
        }
      })

      res.send('change ' + req.params.id)
    }



    )

    router.post('/setgeofilter', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var geoCollection = db.collection("geo." + token.collections)
         
          findDocuments(geoCollection, function (settingsList) {
            if(settingsList && settingsList[0]){
              var settings = settingsList[0]
              if (!settings.geojson) {
                settings.geojson = [req.body.geoJson]
              }
              else {
                settings.geojson[req.body.geoIndex] = req.body.geoJson
              }

              geoCollection.replaceOne({ "_id": settings._id }, settings,{upsert:true})
            }

          })
        }
      })

      res.send('setgeofilter')
    })

    router.get('/addgeofilter', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var geoCollection = db.collection("geo." + token.collections)
          findDocuments(geoCollection, function (settingsList) {
            if(settingsList && settingsList[0]){
              var settings = settingsList[0]
              if (!settings.geojson) {
                settings.geojson = [{ type: "FeatureCollection", features: Array(0) }]
                settings.geoIndex = 0
              }
              else {
                settings.geojson.push({ type: "FeatureCollection", features: Array(0) })
                settings.geoIndex = settings.geojson.length - 1
              }
              geoCollection.replaceOne({ "_id": settings._id }, settings)
            }

          })
        }
      });

      res.send('addgeofilter')
    })


    router.get('/deletegeofilter/:geoIndex/', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var geoCollection = db.collection("geo." + token.collections)
          findDocuments(geoCollection, function (settingsList) {
            if(settingsList && settingsList[0]){
              var settings = settingsList[0]
              if (!settings.geojson) {
                settings.geojson = [{ type: "FeatureCollection", features: Array(0) }]
                settings.geoIndex = 0
              }
              else {
                settings.geojson.splice(req.params.geoIndex, 1)
                settings.geoIndex = 0
              }
              geoCollection.replaceOne({ "_id": settings._id }, settings)
            }

          })
        }
      })

      res.send('deletegeofilter')
    })

    router.get('/setgeoindex/:geoIndex/', function (req, res, next) {
      getUser(req.query.token, function (token) {
        if (token) {
          var geoCollection = db.collection("geo." + token.collections)
          findDocuments(geoCollection, function (settingsList) {
            if(settingsList && settingsList[0]){
              var settings = settingsList[0]
              settings.geoIndex = parseInt(req.params.geoIndex)
              geoCollection.replaceOne({ "_id": settings._id }, settings)
            }

          })
        }
      })

      res.send('setgeoindex')
    })


    router.get('/getgeofilter', function (req, res, next) {


     

      

      getUser(req.query.token, function (token) {
        if (token) {
          var geoCollection = db.collection("geo." + token.collections)
          findDocuments(geoCollection, function (settingsList) {
            if(settingsList && settingsList[0]){
              var  settings = settingsList[0]
              
              if (!settings.geojson) {
                settings.geojson = [{ type: "FeatureCollection", features: Array(0) }]
              }
              if (!settings.geoIndex) {
                settings.geoIndex = 0
              }

              res.send({ geoJson: settings.geojson, geoIndex: settings.geoIndex })
            }
            else{
              settings = {}
              settings.geojson = [{ type: "FeatureCollection", features: Array(0) }]
              settings.geoIndex = 0
              res.send({ geoJson: settings.geojson, geoIndex: settings.geoIndex })
            }

          })
        }
      })


    })




    router.post('/savejob', function (req, res, next) {

      if (req.body.job) {
        getUser(req.query.token, function (token) {
          if (token) {
            var savedCollection = db.collection("saved." + token.collections)
            savedCollection.insertOne(req.body.job)
          }
        })


      }
      res.send('savejob')
    })




    router.get('/apply/:id/:applied/:appliedDate', function (req, res, next) {


      let applied = true;
      if (req.params.applied == "0") {
        applied = false;
      }
      getUser(req.query.token, function (token) {
        if (token) {
          var foundCollection = db.collection("jobs." + token.collections)
          var deletedCollection = db.collection("deleted." + token.collections)
          var savedCollection = db.collection("saved." + token.collections)
          var appliedCollection = db.collection("applied." + token.collections)
          try {
            if (applied == true) {
              foundCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  if (doc) {
                    doc.applied = true
                    if (!doc.notes) doc.notes = {}
                    doc.notes.appliedDate = parseInt(req.params.appliedDate)
                    appliedCollection.insertOne(doc)
                    foundCollection.deleteOne({ "_id": req.params.id })
                  }

                  deletedCollection.findOne({ "_id": req.params.id },
                    function (err, doc) {
                      if (doc) {
                        doc.applied = true
                        if (!doc.notes) doc.notes = {}
                        doc.notes.appliedDate = parseInt(req.params.appliedDate)
                        appliedCollection.insertOne(doc)
                        deletedCollection.deleteOne({ "_id": req.params.id })
                      }

                      savedCollection.findOne({ "_id": req.params.id },
                        function (err, doc) {
                          if (doc) {
                            doc.applied = true
                            if (!doc.notes) doc.notes = {}
                            doc.notes.appliedDate = parseInt(req.params.appliedDate)
                            appliedCollection.insertOne(doc)
                            savedCollection.deleteOne({ "_id": req.params.id })
                          }
                        }
                      )
                    }
                  )
                }
              )

            }
            else {
              appliedCollection.findOne({ "_id": req.params.id },
                function (err, doc) {
                  if (doc) {
                    doc.applied = false
                    if (doc.deleted) {
                      deletedCollection.insertOne(doc)
                    } else if (doc.saved) {
                      savedCollection.insertOne(doc)
                    }
                    else {
                      foundCollection.insertOne(doc)
                    }
                    appliedCollection.deleteOne({ "_id": req.params.id })
                  }

                }
              )

            }
          } catch (e) {
            console.log(e);
          }
        }
      })
      res.send('apply ' + req.params.id)
    });

  }).catch(error => console.error(error))

module.exports = router;

var express = require('express');
const app = express();
var router = express.Router();
const {MongoClient} = require('mongodb');
let sanitize = require('mongo-sanitize');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
let url = "mongodb://localhost:27017/"
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Om användaren loggar in,
// params = användarnamn, hashat lösenord
// kolla om användarnamn finns, om det finns, kolla om hashat lösenord matchar
// om det matchar, returnera ett nytt sessionID, lägg även till nytt sessionID
// i databasen.
// om inte finns returnera status, baserat på status skriv felmeddelane. 
// returnerna en session ID/Token

router.post("/login", (req, res) => {
  let username = req.body.username;
  let pw = req.body.password;
  let myquery = { userID: username, password: pw}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)

      } 
      else if (result != null) {
        
        //Skapar sessionID
        let sessionIDvalue = uuidv4();
        let newSessionID = { $set: {sessionID: sessionIDvalue} };
        
        dbo.collection("users").updateOne(myquery, newSessionID, function(err, result2) {
          if (err) {
            db.close();
            res.sendStatus(500)
 
          }
          else {
            db.close()
            res.status(200).send({sessionID: sessionIDvalue})
  
          }
        });
      } 
      else {
        //If we dont find a result
        res.sendStatus(500)
        db.close();

      }
    })
  })
})


// Om användaren registerar sig,
// params = användarnamn, hasht lösenord
// kolla om användarnamn finns, om det finns returna fel, annnars lägg till
// användare.
// returnear status (ok)
router.post("/register", (req, res) => {

  let username = req.body.username;
  let pw = req.body.password;
  let myquery = { userID: username}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        //Det finns redan en användare med namnet
        res.sendStatus(500)
        db.close();
      } 
      else {
        //skapa användarobjekt
        let id = uuidv4();
        let newUser = {userID: username, password: pw, wall: [], friends: [], requests: [], sessionID: id, invites: []}
        dbo.collection('users').insertOne(newUser, function(err, result) {
          if (err) {throw err}
          else {
            db.close();
            res.sendStatus(200)
          }
        });
      }
    })
  })
})

// Om användare loggar ut
// params = session ID
// ta bort session ID, returna status
// returnarar status (ok)
router.patch("/logout", (req, res) => {
  let id = req.body.sessionID;
  let myquery = { sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        let sessionIDvalue = uuidv4();
        let newSessionID = { $set: {sessionID: sessionIDvalue} };
        dbo.collection("users").updateOne(myquery, newSessionID, function(err, result2) {
          if (err) {
            db.close();
            res.sendStatus(500)
          }
          else {
            db.close()
            res.sendStatus(200)
          }
        });

      } 
      else {
        //If we dont find a result
        res.status(500).send("nothing found!")
        db.close();
      }
    })
  })
})


// Om inloggad, vill vi ha en friendlist på sidan
// params = session ID
// hämtar alla vänner baserat på session ID
// returnerar en lista på alla vänner

router.post(('/friends'), (req, res) => {
  let id = req.body.sessionID;
  let myquery = { sessionID: id}
  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        res.send({friends: result.friends})
        db.close();

      } 
      else {
        res.sendStatus(500)
        db.close();
      }
    })
  })
})


// Om inloggad vill vi ha åtkomst till vänner profil
// params = session ID och användarID(användar Id för vän)  
// identifierar användarID för sessionID, kollar om användarID(för vän) har 
// användarID (från sessionID) som vän. 
// Om inte vän, returnera status
// annars returna följande
// returnerar namn OCH alla meddelanden som skall vara på väggen för vän

router.post(('/friends/:userID'), (req, res) => {

  let user = req.params.userID;
  let id = req.body.sessionID;
  let myquery = { sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
        db.close();
      } 
      else if (result != null) {
        //kolla om användarIDet finns i results.friends array
        //om det finns hämta väggen för användarIDet

        if(result.userID === user) {
            res.send({wall: result.wall}).status(200)
            db.close();
          } 


        else if(result.friends.find(element => element == user)) {
          let userquery = { userID: user}
          dbo.collection("users").findOne(userquery, function(err, result) {
            if (err) {
              res.sendStatus(500)
              db.close();
            } 
            else if (result != null) {
              res.send({wall: result.wall}).status(200)
              db.close();
            } 
            else {
              res.sendStatus(500)
              db.close();
            }
          })
        }
        else {
          res.sendStatus(500)
          db.close();
        }
      } 
      else {
        res.sendStatus(500)
        db.close();
      }
    })
    
  })
})


// Om inloggad och är på egen profil
// params = session ID
// om sessionID inte matchar, returna status
// annars returnera följande:
// returnerar namn OCH alla meddelanden som skall vara på väggen för en själv
router.post(('/'), (req, res) => {

  let id = req.body.sessionID;
  let myquery = { sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        res.send({ "wall" : result.wall, "userID" : result.userID}).status(200)
      } 
      else {
        res.sendStatus(500)
        db.close();
      }
    })
  })
})

// Om sökning sker med specifikt namn
// params = sträng
// matcha mot strängen + regex som tillåter sökningen att var inkomplett (t.ex. 
// Ro ska matcha mot Robin). Matchning baseras på användarID
// retunerar alla användare som matchar strängen + regex
router.get(('/search/:id'), (req, res) => {

  let id = req.params.id;
  let myquery = { userID: {$regex: id}} //behöver mer specifikt uttryck

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").find(myquery).toArray(function (err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        let userList = [];
        for (let i = 0; i < result.length; i++) {
          userList.push(result[i])
        }
        res.send(userList);
      } 
      else {
        res.sendStatus(500)
        db.close();
      }
    })
  })
})



// Om inloggad och vill toggla en vänförfrågning via knapptryck
// params = session ID, användarID
// Om ej togglad, bli togglad, lägg till användarID (för sessionID) som pending invite
// till användarID (för vn). 
// Om togglad ta bort användar ID (från sessionID) som pending invite för användarID 
// returnar status (om ok kan knappen bli icheckad/avcheckad)

//Kolla om redan vänner
//Kolla om 
//Toggle friend request
router.patch(('/request/:userID'), (req, res) => {
  let user = req.params.userID;
  let requester = req.body.sessionID;
  let myquery = { sessionID: requester };

  

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    
    //HITTAR REQUESTER, 
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        //Kollar om requester redan är vän med user
        if(result.friends.find(element => element == user)) {
          db.close();
          res.sendStatus(500);
        }
        else {
          //kolla om user finns i requester.invites
          let myquery = { userID: user };
          let requesterUserID = result.userID;
          
          dbo.collection("users").findOne(myquery, function(err, foundUserResult) {
            if (err) {
              res.sendStatus(500)
            } 
            else if (foundUserResult != null) {
              
              //KOD TAR BORT REQUEST FRÅN USER
              //KOD TAR BORT INVITE FRÅN REQUESTER
              if(foundUserResult.requests.find(element => element == requesterUserID)) {
                //uppdatera requests och kör updateOne på user
                foundUserResult.requests.pop(requesterUserID);
                result.invites.pop(user);
                let myquery = { userID: user };
                let newRequestObject = { $set: {requests: foundUserResult.requests} };
                //UPPDATERA USER TA BORT REQUEsT
                dbo.collection("users").updateOne(myquery, newRequestObject, function(err, result2) {
                  if (err) {
                    db.close();
                    res.sendStatus(500)
                  }
                  else {
                    //UPPDATERA SELF TA BORT INVITE
                    let myquery = { sessionID: requester };
                    let newInviteObject = { $set: {invites: result.invites}};
                    dbo.collection("users").updateOne(myquery, newInviteObject, function(err, result2) {
                      if (err) {
                        db.close();
                        res.sendStatus(500)
                      }
                      else {
                        db.close()
                        res.sendStatus(200)
                      }
                    });
                  }
                });
              }
              else {
                //KOD LÄGGER TILL REQUEST TILL USER
                //KOD LÄGGER TILL INVITIE TILL REQUEsTER
                foundUserResult.requests.push(requesterUserID);
                result.invites.push(user);
                let myquery = { userID: user };
                
                let newRequestObject = { $set: {requests: foundUserResult.requests} };
                //UPPDATERA USER LÄGG TILL REQUEsT
                dbo.collection("users").updateOne(myquery, newRequestObject, function(err, result2) {
                  if (err) {
                    db.close();
                    res.sendStatus(500)
                  }
                  else {
                    //UPPDATERA SELF LÄGG TILLL INVITE
                    let myquery = { sessionID: requester };
                    let newInviteObject = { $set: {invites: result.invites}};
                    dbo.collection("users").updateOne(myquery, newInviteObject, function(err, result2) {
                      if (err) {
                        db.close();
                        res.sendStatus(500)
                      }
                      else {
                        db.close()
                        res.sendStatus(200)
                      }
                    });
                  }
                });
              }
            }
            else {
              res.sendStatus(500)
              db.close();
            }
          });
        }
      }
      else {
        res.sendStatus(500)
        db.close();
      }

    });
    
  })

})
// Om inloggad och vill acceptera/neka vänförfrågan
// params = sessionID, användarID (person som skickad förfrågan), bool
// om true acceptera vänförfrågan och lägg till användarID i friends
// om false neka vänförfrågan
// ta bort pending invite från sessionID. 
// return status (ok t.ex.)

//KOLLA OM SESSION ID FINNS
//KOLLA OM ANVÄNDAR ID FINNS I SESSION REQUESTS
//KOLLA OM BOOL VARIABEL ÄR SANN ELLER FALSK
//__OM SANN AccEPTERA REQUEST; PLOCKA BORT REQUEST OCH PLACERA ANVÄNDER ID I VÄNNER (för sessionID)
//__OM FALSK NEKA REQUEST; PLOCKA BORT REQUEST FRÅN REQUESTS (för sessionID)
router.patch("/requests", (req, res) => {
  let id = req.body.sessionID;
  let requester = req.body.userID;
  let myquery = { sessionID: id}
  let answer = req.body.answer;

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        if(result.requests.find(element => element == requester)) {
          if (answer) {
            //ACCEPTERA
            let sessionUserID = result.userID;
            result.requests.pop(requester)
            result.friends.push(requester)
            let newValues = { $set: {requests: result.requests, friends: result.friends} };
            dbo.collection("users").updateOne(myquery, newValues, function(err, result2) {
              if (err) {
                db.close();
                res.sendStatus(500)
              }
              else {
                myquery = { userID: requester}
                dbo.collection("users").findOne(myquery, function(err, result) {
                  if (err) {
                    res.sendStatus(500)
                  } 
                  else if (result != null) { 
                    result.friends.push(sessionUserID)
                    newValues = { $set: {friends: result.friends} };
                    dbo.collection("users").updateOne(myquery, newValues, function(err, result2) {
                      if (err) {
                        db.close();
                        res.sendStatus(500)
                      }
                      else {
                        res.sendStatus(200)
                      }
                    });
                  }
                })
              }
            });
            
          }
          else {
            //NEKA
            result.requests.pop(requester)
            let newValues = { $set: {requests: result.requests} };
            dbo.collection("users").updateOne(myquery, newValues, function(err, result2) {
              if (err) {
                db.close();
                res.sendStatus(500)
              }
              else {
                db.close()
                res.sendStatus(200)
              }
            });
          }
        }
        else {
          res.status(500).send("nothing found!")
          db.close();
        }
      } 
      else {
        //If we dont find a result
        res.status(500).send("nothing found!")
        db.close();
      }
    })
  })
})

router.post('/getMyRequests', (req, res) => {

  let id = req.body.sessionID;
  let myquery = {sessionID: id}



  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
        db.close();
      } 
      else if (result != null) { 
        res.send({requests: result.requests})
        db.close();
      }
      else {
        res.status(500).send("nothing found!")
        db.close();
      }
    })
  })

})

router.post('/getMySentRequests', (req, res) => {

  let id = req.body.sessionID;
  let myquery = {sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
        db.close();
      } 
      else if (result != null) {
        res.send({invites: result.invites})
        db.close();
      }
      else {
        res.status(500).send("nothing found!")
        db.close();
      }
    })
  })

})


//--------------------------------------------------------------------
//Logged in and posting msg
router.post('/addMsg/:userID', (req, res) => {

  let msg = req.body.msg;
  let user = req.params.userID;
  let id = req.body.sessionID;
  let myquery = {sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tvitter");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
        db.close();
      } 
      else if (!validateMsg(msg)) 
      {
        res.sendStatus(500);
        db.close();
      }
      else if (result != null) { 
        let sender = result.userID;
        if(result.friends.find(element => element == user) || result.userID == user) {
          let userquery = { userID: user}
          dbo.collection("users").findOne(userquery, function(err, result) {
            if (err) {
              res.sendStatus(500)
              db.close();
            } 
            else if (result != null) {
              //add msg to friends wall 
              let date =  new Date()               
              let msgObject = {msg: msg, time: date, sender: sender};
              result.wall.push(msgObject)
              let newValues = { $set: {wall: result.wall} };
              dbo.collection("users").updateOne(userquery, newValues, function(err, result2) {
                if (err) {
                  res.sendStatus(500)
                  db.close();
                } else {
                  res.send({"msg" : msgObject}).status(200)
                  db.close();
                }
              })
            } 
            else {
              res.sendStatus(500)
              db.close();
            }
          })
        } else {
          res.sendStatus(500);
          db.close();
        }
      }
    })
  })
})

function validateMsg(msg) {
  if (msg.length === 0 || msg.length > 140) { return false }
  // if (!(typeof(body.id) === "string"))                        { return false }
  // if (typeof(body.state) !== "boolean")                 { return false }
  return true
}

app.use(function (req, res) {
  res.send("Sorry can't find that!", 404)
})


module.exports = router;


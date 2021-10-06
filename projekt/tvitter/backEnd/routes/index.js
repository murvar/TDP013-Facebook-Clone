var express = require('express');
const app = express();
var router = express.Router();
const {MongoClient} = require('mongodb');
let sanitize = require('mongo-sanitize');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
let url = "mongodb://localhost:27017/";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Om användaren loggar in,
// params = användarnamn, hashat lösenord
// kolla om användarnamn finns, om det finns, kolla om hashat lösenord matchar
// om det matchar, returnera ett nytt sessionID, lägg även till nytt sessionID
// i databasen.
// om inte finns returnera status, baserat på status skriv felmeddelane. 
// returnerna en session ID/Token
/*
router.post("/login", (req, res) => {
  let username = req.params.username;
  let pw = req.params.password;
  let myquery = { userID: username, password: pw}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");
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
            res.status(200).send(sessionIDvalue)
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
*/

// Om användaren registerar sig,
// params = användarnamn, hasht lösenord
// kolla om användarnamn finns, om det finns returna fel, annnars lägg till
// användare.
// returnear status (ok)
router.post("/register", (req, res) => {
  let username = req.params.username;
  let pw = req.params.password;
  let myquery = { userID: username}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");
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
        let newUser = {userID: username, password: pw, wall: , friends: , requests: , sessionID: }
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
/*
// Om användare loggar ut
// params = session ID
// ta bort session ID, returna status
// returnarar status (ok)
router.patch("/logout", (req, res) => {
  let id = req.params.sessionID;
  let myquery = { sessionID: id}

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");
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
        res.sendStatus(500)
        db.close();
      }
    })
  })
})
*/

// Om inloggad, vill vi ha en friendlist på sidan
// params = session ID
// hämtar alla vänner baserat på session ID
// returnerar en lista på alla vänner
/*
router.get(('/friends'), (req, res) => {
  let id = req.params.sessionID;
  let myquery = { sessionID: id}
  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");
    dbo.collection("users").findOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500)
      } 
      else if (result != null) {
        res.send(result.friends)
        db.close();

      } 
      else {
        res.sendStatus(500)
        db.close();
      }
    })
    
  })
})
*/

// Om inloggad vill vi ha åtkomst till vänner profil
// params = session ID och användarID(användar Id för vänn)
// identifierar användarID för sessionID, kollar om användarID(för vänn) har 
// användarID (från sessionID) som vänn. 
// Om inte vänn, returnera status
// annars returna följande
// returnerar namn OCH alla meddelanden som skall vara på väggen för vän


// Om inloggad och är på egen profil
// params = session ID
// om sessionID inte matchar, returna status
// annars returnera följande:
// returnerar namn OCH alla meddelanden som skall vara på väggen för en själv

// Om sökning sker med specifikt namn
// params = sträng
// matcha mot strängen + regex som tillåter sökningen att var inkomplett (t.ex. 
// Ro ska matcha mot Robin). Matchning baseras på användarID
// retunerar alla användare som matchar strängen + regex

// Om inloggad och vill toggla en vänförfrågning via knapptryck
// params = session ID, användarID
// Om ej togglad, bli togglad, lägg till användarID (för sessionID) som pending invite
// till användarID (för vänn). 
// Om togglad ta bort användar ID (från sessionID) som pending invite för användarID 
// returnar status (om ok kan knappen bli icheckad/avcheckad)

//--------------------------------------------------------------------
//Logged in and answering friend request
// router.patch(('/requests/:userID'), (req, res) => {
//   MongoClient.connect(url, (err, db) => {
//     let dbo = db.db("tvitter");
//     let myquery = { id: userID };
    
//     dbo.collection("sessionID/requests").findOne(myquery, function(err, result) {
//       if (err) {
//         res.sendStatus(500)
//       } 
//       else if (result != null) {
//         //If we find a result
//         if (body.answer) {
//           dbo.collection(':sessionID/friends').insertOne(myquery, function(err, result) {
//             if (err) {throw err}
//             else {
//               db.close();
//               res.sendStatus(200)
//             }
  
//           })
//         }
//         else {}
        
//         dbo.collection("messages").updateOne(myquery, newvalues, function(err, result2) {
//           if (err) {
//             db.close();
//             res.sendStatus(500)
//           }
//           else {
//             db.close()
//             res.sendStatus(200)
//           }
//         });
//       } 
//       else {
//         //If we dont find a result
//         res.sendStatus(500)
//         db.close();
//       }
//     });
    
//   })

// })
// Om inloggad och vill acceptera/neka vänförfrågan
// params = sessionID, användarID (person som skickad förfrågan), bool
// om true acceptera vänförfrågan och lägg till användarID i friends
// om false neka vänförfrågan
// ta bort pending invite från sessionID. 
// return status (ok t.ex.)

//--------------------------------------------------------------------
//Logged in and posting msg
// router.post('/friends/:wallID', (req, res) => {
//   console.log(req.body)
//   if (validateMsg(req.body)) {
//     msg = sanitize(req.body)
//     const regex = new RegExp(/<script>/)  //injection?
//     if (!regex.test(msg)) {
//       MongoClient.connect(url, (err, db) => {
//         let dbo = db.db("tvitter");
//         dbo.collection(':wallID/messages').insertOne(msg, function(err, result) {
//           if (err) {throw err}
//           else {
//             db.close();
//             res.sendStatus(200)
//           }

//         });
//       });
//     }
//     else {
//       res.sendStatus(500)
//     }
//   } else {
//     res.sendStatus(500)
//   }
// })

// function validateMsg(body) {
//   if (body.msg.length === 0 || body.msg.length > 140) { return false }
//   if (!(typeof(body.id) === "string"))                        { return false }
//   if (typeof(body.state) !== "boolean")                 { return false }
//   return true
// }
// params = sessionID, användarID/sessionID, msg
// om har tillåtelse att posta, lägg till meddelande på vägg med tid
// och sender. Meddelanden är objekt i databsen som består av msg, time och sender
// returnerar en status (och kanske relaod på page)




app.use(function (req, res) {
  //console.log("found it")
  res.send("Sorry can't find that!", 404)
})


module.exports = router;


/*använd asynkrona anrop för att hämta och lagra data. 
Kan ta in en resolve och reject funktion. 
Med detta kan vi skicka rätt felmeddelanden.
en backend fil som hanterar logik
en testfil som representerar klient-logiken 
(alltså om vi klickar på en knapp kommer meddelande x
skickas t.ex)*/

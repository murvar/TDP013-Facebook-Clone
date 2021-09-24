var express = require('express');
const app = express();
var router = express.Router();
const {MongoClient} = require('mongodb');
let sanitize = require('mongo-sanitize');
let url = "mongodb://localhost:27017/";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


router.all('/messages', function(req, res, next) {
  if(req.method == "POST" || req.method == "GET") {
    //Kolla om get har en body?
    if (req.method == "GET" && req.body) {
        res.sendStatus(405)
    }
    next();
  } else {
    //console.log(req.method)
    res.sendStatus(405)
  }
})

router.all('/messages/:id', function(req, res, next) {
  //console.log("1")
  if(req.method == "PATCH" || req.method == "GET") {
    next();
  } else {
    res.sendStatus(405)
  }
})


//------------------------------------------------------------------
//Save one

router.post('/messages', (req, res) => {
  if (validateMsg(req.body)) {
    msg = sanitize(req.body)
    const regex = new RegExp(/<script>/)  //injection?
    if (!regex.test(msg)) {
      //console.log(req.body)
      MongoClient.connect(url, (err, db) => {
        let dbo = db.db("tdp013");
        dbo.collection('messages').insertOne(msg, function(err, result) {
          if (err) {}
          else {
            db.close();
            res.sendStatus(200)
          }

        });
      });
    }
    else {
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(500)
  }
  
})

function validateMsg(body) {

  if (body.msg.length === 0 || body.msg.length > 140) { return false }
  if (!(typeof(body.id) == "number"))                        { return false }
  if (typeof(body.state) !== "boolean")                 { return false }
  return true
}

//------------------------------------------------------------------
//Mark read
router.patch(('/messages/:id'), (req, res) => {

  let msgId = sanitize(req.params.id)
  //console.log("in patch function with value " + msgId)
  const regex = new RegExp(/\D+/)

  if (regex.test(msgId)) {
    res.sendStatus(400)

  } else {
    MongoClient.connect(url, (err, db) => {
      let dbo = db.db("tdp013");
      let myquery = { id: msgId };
      
      dbo.collection("messages").findOne(myquery, function(err, result) {
        if (err) {
          res.sendStatus(500)
        } 
        else if (result != null) {
          //If we find a result
          let newvalues = { $set: {state: !(result.state)} };
          
          dbo.collection("messages").updateOne(myquery, newvalues, function(err, result2) {
            if (err) {
              db.close();
              res.sendStatus(500)
            }
            else {
              db.close();
              res.sendStatus(200)
            }
          });
        } 
        else {
          //If we dont find a result
          res.sendStatus(500)
          db.close();
        }
      });
      
    });
  }
})

//------------------------------------------------------------------
//Get all
router.get(('/messages'), (req, res) => {

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");

    dbo.collection('messages').find({}).toArray(function(err, result) {
      db.close();
      if (err) {
        //console.log(err)
      }
      else if (result != null) {
        //console.log(result)
        res.send(result)
      }
      else {
        res.sendStatus(500)
      }
    })
    
  })
  //res.send()
})

//------------------------------------------------------------------
// Get one
router.get(('/messages/:id'), (req, res) => {
  let msgId = sanitize(req.params.id)
  const regex = new RegExp(/\D+/)
  if (regex.test(msgId)) {
    res.sendStatus(400)
  } else {

    MongoClient.connect(url, (err, db) => {
      let dbo = db.db("tdp013");
      let myquery = { id: msgId };

      dbo.collection("messages").findOne(myquery, function(err, result) {
        db.close();
        if (err) {
          //console.log(err)
        }
        else if (result != null) {
          res.send(result)//.json(result)
        }
        else {
          res.sendStatus(500)
        }
      });
    });
  }
})

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

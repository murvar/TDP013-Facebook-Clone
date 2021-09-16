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
    next();
  } else {
    res.sendStatus(405)
  }
})

router.all('/messages/:id', function(req, res, next) {
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
      console.log(req.body)
      MongoClient.connect(url, (err, db) => {
        let dbo = db.db("tdp013");
        dbo.collection('messages').insertOne(msg, function(err, res) {
          if (err) {console.log(err)}
          else {console.log('item inserted')}
          db.close();
        });
      });
      res.sendStatus(200)
    }
    else {
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(500)
  }
  
})

function validateMsg(msg) {
  if (msg.length == 0 || msg.length > 140) {
    return false
  } 
  return true
}

//------------------------------------------------------------------
//Mark read
router.patch(('/messages/:id'), (req, res) => {
  let msgId = sanitize(req.params.id)
  console.log("in patch function with value " + msgId)

  const regex = new RegExp(/\D+/)

  if (regex.test(msgId)) {
    res.sendStatus(400)
  } else {
    MongoClient.connect(url, (err, db) => {
      let dbo = db.db("tdp013");
      let myquery = { id: msgId };

      dbo.collection("messages").findOne(myquery, function(err, result) {
        if (err) {console.log(err)}
        else {
          //console.log("Result = " + result.id + " " + result.state + " " + result.msg)
          let newvalues = { $set: {state: !(result.state)} };
          
          dbo.collection("messages").updateOne(myquery, newvalues, function(err, res) {
            if (err) {console.log(err)}
            else {console.log("1 document updated");}
            db.close();
          });
        }
      });
    });
    res.sendStatus(200)
  }
})

//------------------------------------------------------------------
//Get all
router.get(('/messages'), (req, res) => {

  MongoClient.connect(url, (err, db) => {
    let dbo = db.db("tdp013");

    dbo.collection('messages').find({}).toArray(function(err, result) {
      if (err) {console.log(err)}
      db.close();
      res.sendStatus(200)
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
        if (err) {console.log(err)}
        db.close();
        res.sendStatus(200)
      });
    });
  }
})


router.all('*', function(req, res, next) {
  //If no function exists
  res.sendStatus(404)
})

// error handler middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something Broke!');
 })

module.exports = router;


/*använd asynkrona anrop för att hämta och lagra data. 
Kan ta in en resolve och reject funktion. 
Med detta kan vi skicka rätt felmeddelanden.
en backend fil som hanterar logik
en testfil som representerar klient-logiken 
(alltså om vi klickar på en knapp kommer meddelande x
skickas t.ex)*/

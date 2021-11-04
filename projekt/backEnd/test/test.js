const assert = require('assert');
const should = require('should');
const { isTypedArray } = require('util/types');
const { get, patch, post, put } = require('superagent');
const startServer = require("../app.js")
const clearDatabase = require("../app.js");
const { clear } = require('console');
const { option } = require('commander');
const {MongoClient} = require('mongodb');
let server
let sessionID
let sessionID2
let sessionID3

describe('Test Register', () => {
    before(function(done) {
        // runs before each test in this block
        server = startServer()   
        done()
    });
    
    after(function() {
        // runs after each test in this block
        server.close()

    });
    
    it('Register user, return 200', (done) => {
        post('http://localhost:3000/register')
            .type("application/json")
            .send({"username": "Testfall", "password" : "lösenord"})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

    it('Register existing user, return 500', (done) => {
        post('http://localhost:3000/register')
            .type("application/json")
            .send({"username": "Testfall", "password" : "lösenord"})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            }) 
    })
})

describe('Test login', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer()
        done()
    });
    
    after(function() {
        // runs after each test in this block
        server.close()

    });
    
    it('Login non valid user, return 500', (done) =>{
        post('http://localhost:3000/login')
            .type("application/json")
            .send({"username": "felTestfall", "password" : "lösenord"})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('Login valid user with wrong password, return 500', (done) =>{
        post('http://localhost:3000/login')
            .type("application/json")
            .send({"username": "Testfall", "password" : "fellösenord"})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('Login valid user, return 200', (done) =>{
        post('http://localhost:3000/login')
            .type("application/json")
            .send({"username": "Testfall", "password" : "lösenord"})
            .then(res => {
                should(res).have.property("status", 200)
                //SPARA SessionID
                sessionID = res.body.sessionID
                done();
            })
            .catch(err => {
                done();
            })       
    })
 
    
})



describe('Test Logout', () => {
    before(function(done) {
        // runs before each test in this block
        server = startServer()   
        done()
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall")
        server.close()

    });
    
    it('Successful logout, return 200', (done) => {
        patch('http://localhost:3000/logout')
            .type("application/json")
            .send({"sessionID" : sessionID})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

    it('Unsuccessful logout, return 500', (done) => {
        patch('http://localhost:3000/logout')
            .type("application/json")
            .send({"sessionID" : ""})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

})

//  TEST SEARCH
//  TEST specifikt resultat som skall matcha t.ex. "atte"
//  TEST specifikt resultat som är tomt 

describe('TEST  SEARCH', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer()
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                done();
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2");
        server.close()

    });

    it('TEST specifikt resultat som skall matcha t.ex. "fall", skall returnerna array av size 2', (done) =>{
        get('http://localhost:3000/search/fall')
            .type("application/json")
            .then(res => {
                // should(res).be.an.Array();
                should(res.body.length) == 2;
                done();
            })
            .catch(err => {
                done();
            })       
    })
 
    
})

//  TEST TOGGLE FRIENDREQUEST
//  TEST toggla på friendRequest
//  TEST toggla av friendRequest

describe('TEST TOGGLE FRIENDREQUEST', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer();
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                done();
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2");
        server.close()

    });
    
    it('TEST toggla på friendRequest, return 200', (done) =>{
        //console.log("HEJSAN FÖRSTA " + sessionID)
        patch('http://localhost:3000/request/Testfall2')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    //Kör samma test igen, bör toggla AV friend request
    it('TEST toggla AV friendRequest, return 200', (done) =>{
        patch('http://localhost:3000/request/Testfall2')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('TEST toggla friendRequest fel ID, return 500', (done) =>{
        patch('http://localhost:3000/request/Testfall2')
            .type("application/json")
            .send({"sessionID": "thisIsFaultySessionID"})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })       
    })
   
})

//  TEST Acceptera friendrequest
//  TEST Neka friendrequest
describe('TEST ACCEPT OR DENY FRIENDREQUEST', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer();
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                RegAndLogInUser("Testfall3", "lösenord")
                .then( res => {
                    //console.log("second testfall done with sessionID2 " + sessionID2);
                    done();
                })
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2");
        removeUser("Testfall3");
        server.close()

    });
    
    it('TEST acceptera vänförfrågan, return 200', (done) =>{

        patch('http://localhost:3000/request/Testfall')
            .type("application/json")
            .send({"sessionID": sessionID2})
            .then(res => {
                patch('http://localhost:3000/requests')
                .type("application/json")
                .send({"sessionID": sessionID, "userID" : "Testfall2", "answer" : true})
                .then(res => {
                    should(res).have.property("status", 200)
                    done();
                })
                .catch(err => {
                    done();
                })
            })
            .catch(err => {
                done();
            }) 
       
    })

    //Kör samma test igen, bör toggla AV friend request
    it('TEST neka vänförfrågan, return 200', (done) =>{
        patch('http://localhost:3000/request/Testfall')
            .type("application/json")
            .send({"sessionID": sessionID3})
            .then(res => {
                patch('http://localhost:3000/requests')
                .type("application/json")
                .send({"sessionID": sessionID, "userID" : "Testfall3", "answer" : false})
                .then(res => {
                    should(res).have.property("status", 200)
                    done();
                })
                .catch(err => {
                    done();
                })
            })
            .catch(err => {
                done();
            })        
    })
   
})

//  TEST Visit user page
//  TEST Visit user which is ur friend
//  TEST Visit user which is NOT ur friend

describe('TEST VISIT USERS PAGE', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer();
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                RegAndLogInUser("Testfall3", "lösenord")
                .then( res => {
                    //console.log("second testfall done with sessionID2 " + sessionID2);
                    BecomeFriends(sessionID, sessionID2, "Testfall2")
                    .then( res => {
                        done();
                    })
                })
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2");
        removeUser("Testfall3");
        server.close()

    });

    it('TEST besök home, return 200', (done) =>{
        post('http://localhost:3000/')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('TEST besök home utan inloggning, return 500', (done) =>{
        post('http://localhost:3000/')
            .type("application/json")
            .send({"sessionID": ""})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })       
    })
    
    it('TEST kolla profil på person du är vän med, return 200', (done) =>{

        post('http://localhost:3000/friends/Testfall2')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            }) 
       
    })

    //Kör samma test igen, bör toggla AV friend request
    it('TEST kolla profil på person du ej är vän med, return 500', (done) =>{
        post('http://localhost:3000/friends/Testfall3')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })        
    })
   
})


describe('TEST Friendlist', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer();
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                RegAndLogInUser("Testfall3", "lösenord")
                .then( res => {
                    //console.log("second testfall done with sessionID2 " + sessionID2);
                    BecomeFriends(sessionID, sessionID2, "Testfall2")
                    .then( res => {
                        done();
                    })
                })
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2");
        removeUser("Testfall3");
        server.close()

    });
    
    it('TEST returnerar friends lista', (done) =>{
        post('http://localhost:3000/friends')
            .type("application/json")
            .send({"sessionID": sessionID})
            .then(res => {
                //console.log(res.body)
                should(res).be.an.Array();
                done();
            })
            .catch(err => {
                done();
            })       
    })
   
})



//  TEST postMsg
//  TEST friends

describe('TEST Post on Wall', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer();
        RegAndLogInUser("Testfall", "lösenord")
        .then( res => {
            //console.log("first testfall done with sessionID " + sessionID);
            RegAndLogInUser("Testfall2", "lösenord")
            .then( res => {
                //console.log("second testfall done with sessionID2 " + sessionID2);
                RegAndLogInUser("Testfall3", "lösenord")
                .then( res => {
                    //console.log("second testfall done with sessionID2 " + sessionID2);
                    BecomeFriends(sessionID, sessionID2, "Testfall2")
                    .then( res => {
                        done();
                    })
                })
            })
        })
    });
    
    after(function() {
        // runs after each test in this block
        removeUser("Testfall");
        removeUser("Testfall2")
        removeUser("Testfall3")
        server.close()
    });
    
    it('TEST posta på egen vägg, return 200', (done) =>{
        post('http://localhost:3000/addMsg/Testfall')
            .type("application/json")
            .send({"sessionID": sessionID, "msg" : "Hejsan jag postade här"})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('TEST posta på väns vägg, return 200', (done) =>{
        post('http://localhost:3000/addMsg/Testfall2')
            .type("application/json")
            .send({"sessionID": sessionID, "msg" : "Hejsan jag postade här hos idg"})
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })

    it('TEST posta på användares vägg som du inte är vän med, return 500', (done) =>{
        post('http://localhost:3000/addMsg/Testfall3')
            .type("application/json")
            .send({"sessionID": sessionID, "msg" : "Hejsan jag postade här hos idg, det borde inte gå"})
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            })       
    })
   
})


//  Function ONLY used for deleting the user added in the test-cases.
function removeUser(user) {
    let myquery = {userID: user}
    MongoClient.connect("mongodb://localhost:27017/", (err, db) => {
        let dbo = db.db("tvitter");
        dbo.collection("users").deleteOne(myquery, function(err, res) {
          if (err) {
            //console.log("Err in getMySentRequests")
            db.close();
          } 
          else if (res != null) {
            db.close();
          }
          else {
            //console.log("Nothing found")
            db.close();
          }
        })
    })
}

async function RegAndLogInUser(username, pw) {

    return post('http://localhost:3000/register')
        .type("application/json")
        .send({"username": username, "password" : pw})
        .then(res => {
            post('http://localhost:3000/login')
            .type("application/json")
            .send({"username": username, "password" : pw})
            .then(res => {
                if (username == "Testfall") {
                    sessionID = res.body.sessionID
                } else if (username == "Testfall2") {
                    sessionID2 = res.body.sessionID
                } else if (username == "Testfall3") {
                    sessionID3 = res.body.sessionID
                }
            })
        })
}

async function BecomeFriends(sessionID, sessionID2, username2) {
    return patch('http://localhost:3000/request/Testfall')
        .type("application/json")
        .send({"sessionID": sessionID2})
        .then(res => {
            patch('http://localhost:3000/requests')
            .type("application/json")
            .send({"sessionID": sessionID, "userID" : username2, "answer" : true})
            .then(res => {
            })
        })
}




/*
För att testa CORS skickade vi ett options call
i postman som bl.a. returnerar headers.
I dessa headers kollar vi specifikt efter 
"access-control-allow-methods" och "access-control-allow-origin".
Dessa två headers veriferar var vilka/vilken sida som får hämta  från
servern samt vilka metoder som är tillåtna. 

I vårt fall använder origin
sig av en asteriks eftersom vår hemsida går via file:// istället
för http://. 
https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local
*/



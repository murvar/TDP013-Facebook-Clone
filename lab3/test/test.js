const assert = require('assert');
const should = require('should');
const { isTypedArray } = require('util/types');
const { get, patch, post, put } = require('superagent');
const startServer = require("../app.js")
const clearDatabase = require("../app.js");
const { clear } = require('console');
const { option } = require('commander');
let server
apiURL = "http://localhost:8888"

// Frågor imorgon!!!
//Tanke: verifiera att serveranslutning faktiskt finns inför testerna. 
// Dubbelkolla också injections. 
const long = "Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"


describe('Adding message', () => {

    before(function(done) {
        // runs before each test in this block
        server = startServer()
        done()
    });
    
    after(function() {
        // runs after each test in this block
        server.close()

    });

    it('Add message, return 200', (done) =>{
        post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: 'Manny had a cat', state: false, id: 0 })
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })       
    })
 
    it('Add message with too many chars, return 500', (done) =>{
        post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: long, state: false, id: 0 })
            .then(res => {
                done();
            })
            .catch(err => {
                should(err).have.property("status", 500)
                done();
            })  
    })

    it('Add message with too few chars, return 500', (done) =>{
        post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: "", state: false, id: 0 })
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

    it('Add message with PUT, return 405', (done) =>{
        put(apiURL + "/messages")
            .type("application/json")
            .send({ msg: "long", state: false, id: 0 })
            .then(res => {
                done();
            })
            .catch(err => {
                should(err).have.property("status", 405)
                done();
            })
    })

    it('Add message with PATCH, return 405', (done) =>{
        patch(apiURL + "/messages")
            .type("application/json")
            .send({ msg: "long", state: false, id: 0 })
            .then(res => {
                done();
            })
            .catch(err => {
                should(err).have.property("status", 405)
                done();
            })
    })

    it('Add message with faulty state, return 500', (done) =>{
        post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: "hej", state: "fel", id: "date" })
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                should(err).have.property("status", 500)
                done();
            })
    })
    
})


describe('Marking message', () => {
    before(function(done) {
        // runs before each test in this block
            server = startServer()
            post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: 'Manny had a cat', state: false, id: 0 })
            .then(res => {
                done();
            })
            .catch(err => {
                done();
            })   
    });
    
    after(function() {
        // runs after each test in this block
        server.close()

    });

    it('Mark message with valid id, return 200', (done) =>{
        patch(apiURL + "/messages/0")
            .then(res => {
                should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                done();
            })
    })
    
    it('Mark message with wrong id, return 400', (done) =>{
        patch(apiURL + "/messages/s")
            .then(res => {
                should(res).have.property("status", 400)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

    it('Mark message with non-existing id, return 500', (done) =>{
        patch(apiURL + "/messages/10000")
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            }) 
    })

    it('Mark message with POST, return 405', (done) =>{
        post(apiURL + "/messages/10000")
            .then(res => {
                should(res).have.property("status", 500)
                done();
            })
            .catch(err => {
                done();
            }) 
    })
})

describe('Get message', () => {
    before(function(done) {
        server = startServer()
        post(apiURL + "/messages")
            .type("application/json")
            .send({ msg: 'Manny had a cat', state: false, id: 0 })
            .then(res => {
                done();
            })
            .catch(err => {
                done();
            })   
    });
    
    after(function() {
        server.close()
  
    });

    it('Get message with valid id, return 200 and msg?', (done) =>{
        //add message before test?
        get(apiURL + "/messages/0")
            .then(res => {
                should(res).have.property("status", { msg: 'Manny had a cat', state: false, id: 0 }) //application/json?
                done();
            })
            .catch(err => {
                done();
            })  
    })
    it('Get message with wrong id, return 400', (done) =>{
        get(apiURL + "/messages/s")
        .then(res => {
            should(res).have.property("status", 400)
            done();
        })
        .catch(err => {
            done();
        }) 
    })
    it('Get message with non-existing id, return 500', (done) =>{
        get(apiURL + "/messages/9999")
        .then(res => {
            should(res).have.property("status", 500)
            done();
        })
        .catch(err => {
            done();
        }) 
    })

    it('Get message with POST, return 405', (done) =>{
        post(apiURL + "/messages/0")
        .then(res => {
            should(res).have.property("status", 405)
            done();
        })
        .catch(err => {
            done();
        }) 
    })

    it('Get message with PUT, return 405', (done) =>{
        put(apiURL + "/messages/0")
        .then(res => {
            should(res).have.property("status", 405)
            done();
        })
        .catch(err => {
            done();
        }) 
    })

})

//  describe('Get all messages', () => { //Hur rensar vi vår databas under testning?
//     before(function(done) {
//         server = startServer()
//         post(apiURL + "/messages")
//             .type("application/json")
//             .send({ msg: 'Manny had a cat', state: false, id: 0 })
//             .then(res => {
//                 done();
//             })
//             .catch(err => {
//                 done();
//             })   
//     });
    
//      after(function() {
//           //runs after each test in this block
//         server.close()

//      });

//     it('Get messages, return 200 and messages?', (done) =>{
//         get(apiURL + "/messages")
//             .then(res => {
//                 should(res).have.property("status", [{ msg: 'Manny had a cat', state: false, id: 0 }, { msg: 'Manny had a cat', state: false, id: 1 }])
//                 //should(res).have.an.Array();
//                 done();
//             })
//             .catch(err => {
//                 done();
//             }) 
//      })
    //  it('Get messages with PUT, return 405', (done) =>{
    //      done()
    //  })
    //  it('Get messages with PATCH, return 405', (done) =>{
    //      done()
    //  })
//  })


 describe('Calls that do not map', () => {
    before(function(done) {
                // runs before each test in this block
                server = startServer()
                done()
            });
            
            after(function() {
                // runs after each test in this block
                server.close()
        
            });

     it('Name?, return 404', (done) => {
        post(apiURL + "/janjkfan")
            .type("application/json")
            .send({ msg: 'Manny had a cat', state: false, id: 0 })
            .then((res) => {
                assert.strictEqual(res.status, 404)
                done();
            })
            .catch((err) => {
                assert.strictEqual(err.status, 404)
                done();
            }) 
     })
 })

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



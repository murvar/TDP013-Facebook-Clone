const assert = require('assert');
const should = require('should');
const { isTypedArray } = require('util/types');
const { post } = require('superagent');
//var express = require('express');
//var app = express();
const server = require("../app.js")
//const expect = require('expect.js');

// Frågor imorgon!!!
//Tanke: verifiera att serveranslutning faktiskt finns inför testerna. 
// Dubbelkolla också injections. 


describe('Adding message', () => {

    beforeEach(function() {
        // runs before each test in this block
        let server = app.listen(8888, () => {
        let host = server.address().address
        let port = server.address().port
        console.log(`Lyssnar på http://${host}:${port}`)
        })
    });
    
    afterEach(function() {
        // runs after each test in this block
        server.close()
    });

    it('Add message, return 200', (done) =>{
        //Run server
        post("/messages")
            .type("form")
            .send({ msg: 'Manny had a cat', state: false, id: false })
            //.set('accept', 'json')
            .then(res => {
                console.log(res);
                //should(res).have.property("status", 200)
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
            
        
        //done() 
    })

    /*
    it('Add message with too many chars, return 500', (done) =>{
        done()
    })
    it('Add message with too few chars, return 500', (done) =>{
        done()
    })
    it('Add message with injection, return 200', (done) =>{
        done()
    })
    it('Add message with GET, return 405', (done) =>{
        done()
    })
    it('Add message with PUT, return 405', (done) =>{
        done()
    })
    it('Add message with PATCH, return 405', (done) =>{
        done()
    })*/
})

/*
describe('Marking message', () => {
    it('Mark message with valid id, return 200', (done) =>{
        done() 
    })
    it('Mark message with wrong id, return 400', (done) =>{
        done() 
    })
    it('Mark message with non-existing id, return 500', (done) =>{
        done()
    })
    it('Mark message with injection, return?', (done) =>{
        done()
    })
    it('Mark message with GET, return 405', (done) =>{
        done()
    })
    it('Mark message with POST, return 405', (done) =>{
        done()
    })
})

describe('Get message', () => {
    it('Get message with valid id, return 200 and msg?', (done) =>{
        done() 
    })
    it('Get message with wrong id, return 400', (done) =>{
        done() 
    })
    it('Get message with non-existing id, return 500', (done) =>{
        done()
    })
    it('Get message with injection, return?', (done) =>{
        done()
    })
    it('Get message with POST, return 405', (done) =>{
        done()
    })
    it('Get message with PUT, return 405', (done) =>{
        done()
    })
    it('Get message with PATCH, return 405', (done) =>{
        done()
    })
})

describe('Get all messages', () => {
    it('Get messages, return 200 and messages?', (done) =>{
        done()
    })
    it('Get message with POST, return 405', (done) =>{
        done()
    })
    it('Get message with PUT, return 405', (done) =>{
        done()
    })
    it('Get message with PATCH, return 405', (done) =>{
        done()
    })
})

describe('Calls that do not map', () => {
    it('Name?, return 404', (done) =>{
        done()
    })
})

//Anrop som ej mappar till funktion, return 404


let user = { name: 'John', pets: ['Jane', 'Pete', 'Mary'] }


describe('test', () => {
    it('this is my test', (done) => {
        user.should.have.property('name', 'John')  
        done()
    })
    it('this is my other test', (done) => {
        user.should.have.property('pets').with.lengthOf(3)  
        done()
    })
})

*/

